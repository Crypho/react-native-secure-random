import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

const { SecureRandom } = NativeModules

const DESIRED_POOL_SIZE = 2048
const MINIMUM_POOL_SIZE = 1024
const pool = []

function b64ToUInt8(b64) {
  return new Uint8Array(Buffer(b64, 'base64'))
}

/**
 * Refill the random pool used by randomBytes()
 *
 * Normally you do not need to call this function yourself; it is
 * automatically invoked by randomBytesSync if the pool is starting
 * to become low.
 *
 * @returns {Promise<void>}
 */
export async function fillPool() {
  const randomAvailable = pool.length
  if (randomAvailable < MINIMUM_POOL_SIZE) {
    const seed = await randomBytesAsync(DESIRED_POOL_SIZE - randomAvailable)
    pool.push(...seed)
  }
}

/**
 * Generate random data asynchronously
 *
 * @param {number} length Number of bytes to generate
 * @returns {Promise<Uint8Array>}
 */
export function randomBytesAsync(length) {
  return SecureRandom.randomBytesAsync(length).then(b64ToUInt8)
}

/**
 * Generate random data synchronously.
 *
 * @param {number} length Number of bytes to generate
 * @returns {number[]}
 */
export function randomBytesSync(length) {
  if (length > pool.length) {
    throw new Error('Random pool depleted')
  }
  const bytes = pool.splice(0, length)
  fillPool()
  return bytes
}

/**
 * Alias randomBytes to randomBytesSync, so that
 * the module can work as a replacement to node's crypto.
 *
 * @param {number} length Number of bytes to generate
 * @returns {number[]}
 */
export function randomBytes(length) {
  return randomBytesSync(length)
}

fillPool()
