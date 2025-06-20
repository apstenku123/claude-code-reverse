/**
 * Checks if the provided value is a string and matches the vt6.default regular expression pattern.
 *
 * @param {string} value - The value to be tested against the regular expression.
 * @returns {boolean} True if the value is a string and matches the pattern; otherwise, false.
 */
function isValidStringPattern(value) {
  // Ensure the value is a string and matches the vt6.default regex pattern
  return typeof value === "string" && vt6.default.test(value);
}

module.exports = isValidStringPattern;