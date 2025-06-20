/**
 * Removes the first and last character from the input string if isBlobOrFileLikeObject matches a specific pattern.
 *
 * @param {string} inputString - The string to process. If isBlobOrFileLikeObject matches the pattern defined by isPatternMatch, the first and last character are removed.
 * @returns {string} The processed string, with surrounding characters removed if the pattern matches, otherwise the original string.
 */
function removeSurroundingCharactersIfPatternMatches(inputString) {
  // Check if the input string matches the pattern using isPatternMatch
  if (isPatternMatch(inputString)) {
    // Remove the first and last character
    return inputString.substr(1, inputString.length - 2);
  } else {
    // Return the original string if the pattern does not match
    return inputString;
  }
}

module.exports = removeSurroundingCharactersIfPatternMatches;