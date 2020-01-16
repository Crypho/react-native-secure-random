import { NativeModules } from 'react-native'
const Buffer = require('buffer').Buffer
const { SecureRandom } = NativeModules

const POOL_SIZE = 1024
let pool = []

const b64ToUInt8 = function(b64) {
  return new Uint8Array(Buffer(b64, 'base64'))
}

const fillPool = function() {
  if (pool.length < POOL_SIZE) {
    randomBytesAsync(POOL_SIZE - pool.length).then(seed => {
      pool.splice(pool.length, 0, ...seed)
    })
  }
}

const randomBytesAsync = function(length) {
  return SecureRandom.randomBytesAsync(length).then(b64ToUInt8)
}

const randomBytesSync = function(length) {
  if (length > pool.length) {
    throw 'Random pool depleted'
  }
  const bytes = pool.splice(0, length)
  fillPool()
  return bytes
}

fillPool()

export { randomBytesAsync, randomBytesSync }
