/**
 * Decodes a base64-encoded observable value into a Uint8Array.
 *
 * @async
 * @function decodeBase64ObservableToUint8Array
 * @param {any} sourceObservable - The input value or observable to be processed and decoded.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing the decoded binary data.
 */
async function decodeBase64ObservableToUint8Array(sourceObservable) {
  // Await the result of processing the source observable (e.g., fetching or transforming data)
  const base64String = await readFileAsBase64(sourceObservable);
  // Decode the base64 string into a binary buffer using Fh6 utility
  const binaryBuffer = Fh6.fromBase64(base64String);
  // Convert the binary buffer into a Uint8Array and return
  return new Uint8Array(binaryBuffer);
}

module.exports = decodeBase64ObservableToUint8Array;