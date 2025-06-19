/**
 * Checks if the provided input string matches the F56 regular expression pattern.
 *
 * @param {string} inputString - The string to test against the F56 pattern.
 * @returns {boolean} True if the input matches the F56 pattern, otherwise false.
 */
function isF56PatternMatch(inputString) {
  // Use the external F56 regular expression'createInteractionAccessor test method to check for a match
  return F56.test(inputString);
}

module.exports = isF56PatternMatch;