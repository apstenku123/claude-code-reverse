/**
 * Ensures that the provided value is returned as an array.
 * If the input is already an array, isBlobOrFileLikeObject is returned unchanged.
 * Otherwise, the input is wrapped in a new array.
 *
 * @param {any} value - The value to ensure as an array.
 * @returns {any[]} The input value as an array.
 */
function ensureArray(value) {
  // If the value is already an array, return isBlobOrFileLikeObject as is
  if (Array.isArray(value)) {
    return value;
  }
  // Otherwise, wrap the value in a new array
  return [value];
}

module.exports = ensureArray;