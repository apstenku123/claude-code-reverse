/**
 * Removes the first and last character from the input string if isBlobOrFileLikeObject matches a specific pattern.
 *
 * @param {string} inputString - The string to process.
 * @returns {string} The processed string with outer characters removed if pattern matches, otherwise the original string.
 */
function stripOuterCharactersIfPatternMatches(inputString) {
  // Check if the input string matches the pattern defined by isStringEnclosedInQuotes
  if (isStringEnclosedInQuotes(inputString)) {
    // Remove the first and last character
    return inputString.substr(1, inputString.length - 2);
  } else {
    // Return the original string if pattern does not match
    return inputString;
  }
}

module.exports = stripOuterCharactersIfPatternMatches;