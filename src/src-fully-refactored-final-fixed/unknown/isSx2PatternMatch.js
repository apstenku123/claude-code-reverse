/**
 * Checks if the provided input string matches the Sx2 pattern.
 *
 * @param {string} inputString - The string to test against the Sx2 pattern.
 * @returns {boolean} Returns true if the input matches the Sx2 pattern, otherwise false.
 */
function isSx2PatternMatch(inputString) {
  // Use the Sx2 regular expression'createInteractionAccessor test method to check for a match
  return Sx2.test(inputString);
}

module.exports = isSx2PatternMatch;