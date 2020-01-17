# react-native-secure-random

Synchronous and asynchronous native random number provider for iOS and Android.

`react-native-secure-random` bridges iOS's [SecRandomCopyBytes](https://developer.apple.com/documentation/security/1399291-secrandomcopybytes) and Android's [java.security.SecureRandom](https://developer.android.com/reference/java/security/SecureRandom) to provide secure random bytes to react native apps.

## Getting started

`$ npm install react-native-secure-random --save`

### Mostly automatic installation
`$ react-native link react-native-secure-random`

## Usage

To obtain bytes asynchronously use `randomBytesAsync`.
```javascript
import { randomBytesAsync } from 'react-native-secure-random'

randomBytesAsync(10).then(bytes => {
  // bytes is an Uint8Array of 10 elements.
})
```

In order to support legacy code that needs randomness synchronously you can use the synchronous version:
```javascript
import { randomBytesSync } from 'react-native-secure-random'

const bytes = randomBytesSync(10) // bytes is an Uint8Array of 10 elements.
```

Note that `randomBytesSync` relies on having a small pool which it fills when the package is initialized, and refills when it starts to run low. That means that it is possible to deplete the pool faster than you fill it if you request a lot of bytes fast. An exception will be thrown in that case.

## LICENSE

    The MIT License

    Copyright (c) 2020 Crypho AS.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
