/**
 * Checks if the provided value is an empty string or an empty ArrayBuffer-like object.
 *
 * @param {string|{byteLength: number}} value - The value to check. Can be a string or an object with a byteLength property (e.g., ArrayBuffer, Buffer).
 * @returns {boolean} Returns true if the value is an empty string or an empty buffer; otherwise, false.
 */
function isEmptyStringOrBuffer(value) {
  // If the value is a string, check if its length is zero
  if (typeof value === "string") {
    return value.length === 0;
  }
  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor a buffer-like object and check if its byteLength is zero
  return value.byteLength === 0;
}

module.exports = isEmptyStringOrBuffer;
