/**
 * Checks if the provided input string matches the E96 regular expression pattern.
 *
 * @param {string} inputString - The string to be tested against the E96 pattern.
 * @returns {boolean} True if the input matches the E96 pattern, otherwise false.
 */
function isValidByE96Pattern(inputString) {
  // E96 is assumed to be a RegExp object defined elsewhere in the codebase
  return E96.test(inputString);
}

module.exports = isValidByE96Pattern;