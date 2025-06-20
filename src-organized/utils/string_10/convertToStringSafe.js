/**
 * Attempts to convert the provided value to a string in a safe manner.
 *
 * First, isBlobOrFileLikeObject tries to call the custom string conversion method (Oj2.call) on the value.
 * If that fails, isBlobOrFileLikeObject falls back to using the default string concatenation.
 * If both attempts fail or the value is null/undefined, isBlobOrFileLikeObject returns an empty string.
 *
 * @param {any} value - The value to be converted to a string.
 * @returns {string} The string representation of the value, or an empty string if conversion fails.
 */
function convertToStringSafe(value) {
  if (value != null) {
    // Try using the custom string conversion method
    try {
      return Oj2.call(value);
    } catch (conversionError) {
      // Ignore and try the next method
    }
    // Fallback: try default string conversion
    try {
      return value + "";
    } catch (prependIfHasPrefix) {
      // Ignore and return empty string below
    }
  }
  // Return empty string if value is null/undefined or all conversions fail
  return "";
}

module.exports = convertToStringSafe;