/**
 * Checks if the provided input matches the pattern defined by the Vv4 regular expression.
 *
 * @param {string} inputValue - The input string to validate against the Vv4 regex pattern.
 * @returns {boolean} True if the input matches the pattern, false otherwise.
 */
function isValidInputByRegex(inputValue) {
  // Use the Vv4 regular expression'createInteractionAccessor test method to validate the input
  return Vv4.test(inputValue);
}

module.exports = isValidInputByRegex;