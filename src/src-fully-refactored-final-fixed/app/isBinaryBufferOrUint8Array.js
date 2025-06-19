/**
 * Checks if the provided value is either a Buffer or a Uint8Array.
 *
 * This utility function is useful for determining if a given object
 * represents binary data in Node.js environments, supporting both Buffer
 * (Node.js) and Uint8Array (browser/standard JS) types.
 *
 * @param {any} value - The value to check for Buffer or Uint8Array type.
 * @returns {boolean} Returns true if the value is a Buffer or Uint8Array, otherwise false.
 */
function isBinaryBufferOrUint8Array(value) {
  // Check if value is an instance of Uint8Array (covers browser/standard JS)
  // or if isBlobOrFileLikeObject is a Node.js Buffer
  return value instanceof Uint8Array || Buffer.isBuffer(value);
}

module.exports = isBinaryBufferOrUint8Array;
