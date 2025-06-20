/**
 * Checks if the provided input string matches the E96 regular expression pattern.
 *
 * @param {string} inputString - The string to be tested against the E96 pattern.
 * @returns {boolean} True if the input string matches the E96 pattern, otherwise false.
 */
function isE96PatternMatch(inputString) {
  // Use the E96 regular expression'createInteractionAccessor test method to check for a match
  return E96.test(inputString);
}

module.exports = isE96PatternMatch;