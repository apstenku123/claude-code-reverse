/**
 * Converts the input value to a well-formed Unicode string.
 * Uses String.prototype.toWellFormed if available, otherwise falls back to DY6.toUSVString.
 *
 * @param {any} inputValue - The value to convert to a well-formed Unicode string.
 * @returns {string} The well-formed Unicode string representation of the input.
 */
function convertToWellFormedUnicodeString(inputValue) {
  // xY6 is a feature flag indicating if String.prototype.toWellFormed is available
  // DY6.toUSVString is a fallback utility for Unicode Scalar Value conversion
  if (xY6) {
    // Use native toWellFormed if available
    return `${inputValue}`.toWellFormed();
  } else {
    // Fallback to custom Unicode Scalar Value conversion
    return DY6.toUSVString(inputValue);
  }
}

module.exports = convertToWellFormedUnicodeString;