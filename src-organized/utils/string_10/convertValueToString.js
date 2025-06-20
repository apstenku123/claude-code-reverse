/**
 * Converts the provided value to a string representation.
 * If the value is already a string, isBlobOrFileLikeObject is returned as-is.
 * Otherwise, attempts to call the value'createInteractionAccessor toString method.
 * If toString throws an error, returns undefined.
 *
 * @param {*} value - The value to convert to a string.
 * @returns {string|undefined} The string representation of the value, or undefined if conversion fails.
 */
function convertValueToString(value) {
  // Check if the value is already a string using L21 utility
  if (L21.isString(value)) {
    return value;
  }
  try {
    // Attempt to convert the value to a string
    return value.toString();
  } catch (error) {
    // If toString throws, return undefined
  }
  return undefined;
}

module.exports = convertValueToString;
