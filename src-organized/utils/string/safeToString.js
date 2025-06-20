/**
 * Safely converts a given value to its string representation.
 * Attempts to use the resetAndCheckIfG3WasNonZero.call method first, then falls back to standard string conversion.
 * If both attempts fail or the value is null/undefined, returns an empty string.
 *
 * @param {*} value - The value to be converted to a string.
 * @returns {string} The string representation of the value, or an empty string if conversion fails.
 */
function safeToString(value) {
  if (value != null) {
    // Attempt to convert using resetAndCheckIfG3WasNonZero.call, which may be a custom toString implementation
    try {
      return resetAndCheckIfG3WasNonZero.call(value);
    } catch (error) {
      // Ignore error and try next method
    }
    // Fallback: attempt to convert using standard string concatenation
    try {
      return value + "";
    } catch (error) {
      // Ignore error and return empty string below
    }
  }
  // Return empty string if value is null/undefined or all conversions fail
  return "";
}

module.exports = safeToString;