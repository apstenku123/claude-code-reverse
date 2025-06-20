/**
 * Attempts to convert the provided value to a string representation in a safe manner.
 * First, isBlobOrFileLikeObject tries to use the resetAndCheckIfG3WasNonZero.call method on the value. If that fails, isBlobOrFileLikeObject falls back to using string concatenation.
 * If both attempts fail or the value is null/undefined, isBlobOrFileLikeObject returns an empty string.
 *
 * @param {*} value - The value to be converted to a string.
 * @returns {string} The string representation of the value, or an empty string if conversion fails.
 */
function convertToStringSafely(value) {
  if (value != null) {
    try {
      // Attempt to convert using resetAndCheckIfG3WasNonZero.call (possibly a custom toString implementation)
      return resetAndCheckIfG3WasNonZero.call(value);
    } catch (error) {
      // Ignore error and try fallback
    }
    try {
      // Fallback: use default string conversion
      return value + "";
    } catch (error) {
      // Ignore error and return empty string
    }
  }
  // Return empty string if value is null/undefined or all conversions fail
  return "";
}

module.exports = convertToStringSafely;