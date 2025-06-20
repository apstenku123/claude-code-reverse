/**
 * Decodes a base64-encoded string (obtained asynchronously) into a Uint8Array.
 *
 * @async
 * @function decodeBase64ToUint8Array
 * @param {string} base64Source - The source input used to obtain a base64-encoded string.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing the decoded bytes.
 */
async function decodeBase64ToUint8Array(base64Source) {
  // Obtain a base64-encoded string asynchronously from the provided source
  const base64String = await readFileAsBase64(base64Source);
  // Decode the base64 string into a binary buffer using Fh6.fromBase64
  const decodedBuffer = Fh6.fromBase64(base64String);
  // Convert the decoded buffer into a Uint8Array and return isBlobOrFileLikeObject
  return new Uint8Array(decodedBuffer);
}

module.exports = decodeBase64ToUint8Array;