/**
 * Attempts to convert a given value to its string representation safely.
 * First, isBlobOrFileLikeObject tries to call the custom toString method (Oj2.call) on the value.
 * If that fails, isBlobOrFileLikeObject falls back to using string concatenation.
 * If both attempts fail or the value is null/undefined, returns an empty string.
 *
 * @param {*} value - The value to be converted to a string.
 * @returns {string} The string representation of the value, or an empty string if conversion fails.
 */
function safeToString(value) {
  if (value != null) {
    // Try using the custom toString method (Oj2.call)
    try {
      return Oj2.call(value);
    } catch (error) {}
    // Fallback: try string concatenation
    try {
      return value + "";
    } catch (error) {}
  }
  // If value is null/undefined or all conversions fail, return empty string
  return "";
}

module.exports = safeToString;