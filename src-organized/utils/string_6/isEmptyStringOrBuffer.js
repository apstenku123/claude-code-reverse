/**
 * Checks if the given value is an empty string or an empty ArrayBuffer-like object.
 *
 * If the input is a string, returns true if isBlobOrFileLikeObject is an empty string ('').
 * If the input is an object with a byteLength property (e.g., ArrayBuffer, Buffer), returns true if byteLength is 0.
 *
 * @param {string|{byteLength: number}} value - The value to check for emptiness. Can be a string or an object with a byteLength property.
 * @returns {boolean} True if the value is an empty string or an empty buffer-like object, false otherwise.
 */
function isEmptyStringOrBuffer(value) {
  // Check if the value is a string
  if (typeof value === "string") {
    return value.length === 0;
  }
  // Assume value is a buffer-like object with byteLength property
  return value.byteLength === 0;
}

module.exports = isEmptyStringOrBuffer;