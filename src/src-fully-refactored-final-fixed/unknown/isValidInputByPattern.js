/**
 * Checks if the provided input string matches the predefined regular expression pattern W56.
 *
 * @param {string} inputString - The string to be tested against the pattern.
 * @returns {boolean} True if the input matches the pattern; otherwise, false.
 */
function isValidInputByPattern(inputString) {
  // Test the input string against the W56 regular expression pattern
  return W56.test(inputString);
}

module.exports = isValidInputByPattern;