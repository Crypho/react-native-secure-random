#import "SecureRandom.h"


@implementation SecureRandom

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(randomBytesAsync,
                 randomBytesAsync:(NSUInteger)length
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSMutableData *bytes = [NSMutableData dataWithLength:length];
    OSStatus result = SecRandomCopyBytes(kSecRandomDefault, length, [bytes mutableBytes]);
    if (result == errSecSuccess) {
        resolve([bytes base64EncodedStringWithOptions:0]);
    } else {
        reject(@"ERR_RANDOM", @"Failed to create a secure random bytes", [NSError errorWithDomain:@"react-native-secure-random" code:result userInfo:nil]);
    }
}

@end
