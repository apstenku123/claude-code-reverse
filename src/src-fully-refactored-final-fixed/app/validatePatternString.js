/**
 * Validates that the provided pattern is a string and does not exceed the maximum allowed length.
 * Throws a TypeError if the pattern is invalid.
 *
 * @param {string} pattern - The pattern string to validate.
 * @throws {TypeError} If the pattern is not a string or is too long.
 */
function validatePatternString(pattern) {
  // Ensure the pattern is a string
  if (typeof pattern !== "string") {
    throw new TypeError("invalid pattern");
  }
  // Ensure the pattern is not longer than 65536 characters
  if (pattern.length > 65536) {
    throw new TypeError("pattern is too long");
  }
}

module.exports = validatePatternString;
