/**
 * Checks if the provided input string matches the predefined regular expression pattern.
 *
 * @param {string} inputString - The string to test against the pattern.
 * @returns {boolean} True if the input string matches the pattern; otherwise, false.
 */
function isPatternMatch(inputString) {
  // Test the input string against the zr4 regular expression pattern
  return zr4.test(inputString);
}

module.exports = isPatternMatch;