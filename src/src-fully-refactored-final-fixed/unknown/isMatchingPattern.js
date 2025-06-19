/**
 * Checks if the provided input string matches the predefined regular expression pattern.
 *
 * @param {string} inputString - The string to test against the pattern.
 * @returns {boolean} True if the input string matches the pattern, false otherwise.
 */
const isMatchingPattern = (inputString) => {
  // Use the external regular expression 'yq6' to test the input string
  return yq6.test(inputString);
};

module.exports = isMatchingPattern;
