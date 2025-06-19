/**
 * Attempts to convert the provided value to a string using a custom method if available,
 * falling back to standard string conversion if necessary. Returns an empty string if all conversions fail.
 *
 * @param {any} value - The value to be converted to a string.
 * @returns {string} The string representation of the value, or an empty string if conversion fails.
 */
function convertToStringWithFallback(value) {
  if (value != null) {
    try {
      // Attempt to convert using the custom Oj2 method
      return Oj2.call(value);
    } catch (conversionErrorWithOj2) {
      // Ignore error and try standard conversion
    }
    try {
      // Fallback to default string conversion
      return String(value);
    } catch (conversionErrorWithString) {
      // Ignore error and return empty string
    }
  }
  // If value is null/undefined or all conversions fail, return empty string
  return "";
}

module.exports = convertToStringWithFallback;