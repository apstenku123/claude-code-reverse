/**
 * Checks if the provided input string matches the w96 regular expression pattern.
 *
 * @param {string} inputString - The string to test against the w96 pattern.
 * @returns {boolean} True if the input string matches the pattern, otherwise false.
 */
function isW96PatternMatch(inputString) {
  // Use the w96 regular expression'createInteractionAccessor test method to check for a match
  return w96.test(inputString);
}

module.exports = isW96PatternMatch;