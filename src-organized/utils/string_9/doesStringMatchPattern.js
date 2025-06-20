/**
 * Checks if the provided input string matches the regular expression pattern `tt4`.
 *
 * @param {string} inputString - The string to test against the pattern.
 * @returns {boolean} True if the string matches the pattern, false otherwise.
 */
function doesStringMatchPattern(inputString) {
  // Test if inputString matches the regular expression tt4
  return inputString.match(tt4) !== null;
}

module.exports = doesStringMatchPattern;