import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

const { SecureRandom } = NativeModules

const DESIRED_POOL_SIZE = 2048
const MINIMUM_POOL_SIZE = 1024
const pool = []

function b64ToUInt8(b64) {
  return new Uint8Array(Buffer(b64, 'base64'))
}

function fillPool() {
  const randomAvailable = pool.length
  if (randomAvailable < MINIMUM_POOL_SIZE) {
    randomBytesAsync(DESIRED_POOL_SIZE - randomAvailable).then(seed => {
      pool.push(...seed)
    })
  }
}

/**
 * Generate random data asynchronously
 *
 * @param {number} length Number of bytes to generate
 * @returns {Uint8Array}
 */
function randomBytesAsync(length) {
  return SecureRandom.randomBytesAsync(length).then(b64ToUInt8)
}

/**
 * Generate random data synchronously.
 *
 * @param {number} length Number of bytes to generate
 * @returns {number[]}
 */
function randomBytesSync(length) {
  if (length > pool.length) {
    throw new Error('Random pool depleted')
  }
  const bytes = pool.splice(0, length)
  fillPool()
  return bytes
}

fillPool()

export { randomBytesAsync, randomBytesSync }
