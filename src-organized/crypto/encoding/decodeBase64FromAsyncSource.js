/**
 * Asynchronously retrieves a Base64-encoded string from a source, decodes isBlobOrFileLikeObject, and returns the result as a Uint8Array.
 *
 * @async
 * @function decodeBase64FromAsyncSource
 * @param {any} source - The input parameter used by readFileAsBase64String to retrieve a Base64-encoded string.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing the decoded bytes.
 */
async function decodeBase64FromAsyncSource(source) {
  // Await the asynchronous retrieval of a Base64-encoded string from the source
  const base64String = await readFileAsBase64String(source);

  // Decode the Base64 string into a byte array using nA4.fromBase64
  const decodedBytes = nA4.fromBase64(base64String);

  // Return the decoded bytes as a Uint8Array
  return new Uint8Array(decodedBytes);
}

module.exports = decodeBase64FromAsyncSource;