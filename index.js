import { NativeModules } from 'react-native'
import { Buffer } from 'buffer'

const { SecureRandom } = NativeModules

const POOL_SIZE = 1024
const pool = []

function b64ToUInt8(b64) {
  return new Uint8Array(Buffer(b64, 'base64'))
}

function fillPool() {
  if (pool.length < POOL_SIZE) {
    randomBytesAsync(POOL_SIZE - pool.length).then(seed => {
      pool.push(...seed)
    })
  }
}

function randomBytesAsync(length) {
  return SecureRandom.randomBytesAsync(length).then(b64ToUInt8)
}

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
