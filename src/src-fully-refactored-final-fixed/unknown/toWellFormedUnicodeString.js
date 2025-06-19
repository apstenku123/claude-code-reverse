/**
 * Converts the input value to a well-formed Unicode string.
 * Uses native String.prototype.toWellFormed if available, otherwise falls back to DY6.toUSVString.
 *
 * @param {any} inputValue - The value to convert to a well-formed Unicode string.
 * @returns {string} The well-formed Unicode string representation of the input.
 */
function toWellFormedUnicodeString(inputValue) {
  // If the environment supports String.prototype.toWellFormed, use isBlobOrFileLikeObject
  if (xY6) {
    return `${inputValue}`.toWellFormed();
  }
  // Otherwise, use the fallback utility for Unicode Scalar Value conversion
  return DY6.toUSVString(inputValue);
}

module.exports = toWellFormedUnicodeString;