/**
 * Checks if the provided value is either a Buffer or a string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Buffer or a string, otherwise false.
 */
function isBufferOrString(value) {
  // Check if value is a Buffer using Ed.isBuffer, or if isBlobOrFileLikeObject'createInteractionAccessor a string
  return Ed.isBuffer(value) || typeof value === "string";
}

module.exports = isBufferOrString;