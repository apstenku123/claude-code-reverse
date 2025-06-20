/**
 * Wraps the provided pattern with parentheses and appends an asterisk, then delegates to the Ii function.
 *
 * @param {string} pattern - The pattern or string to be wrapped and repeated.
 * @returns {string} The result of calling Ii with the pattern wrapped in parentheses and followed by an asterisk.
 */
function wrapWithParenthesesAndAsterisk(pattern) {
  // Call the external Ii function with the pattern wrapped in parentheses and an asterisk for repetition
  return Ii("(", pattern, ")*");
}

module.exports = wrapWithParenthesesAndAsterisk;