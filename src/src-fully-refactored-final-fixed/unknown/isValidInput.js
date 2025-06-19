/**
 * Checks if the provided input matches the pattern defined by the Vv4 regular expression.
 *
 * @param {string} input - The input string to be tested against the Vv4 pattern.
 * @returns {boolean} True if the input matches the pattern; otherwise, false.
 */
function isValidInput(input) {
  // Test the input string using the Vv4 regular expression pattern
  return Vv4.test(input);
}

module.exports = isValidInput;