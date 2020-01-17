/**
 * Generate random data asynchronously
 */
declare function randomBytesAsync(length: number): Promise<Uint8Array>;
/**
 * Generate random data synchronously.
 */
declare function randomBytesSync(length: number): number[];

export { randomBytesAsync, randomBytesSync };
