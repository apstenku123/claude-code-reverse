/**
 * Removes the first and last character from the input string if isBlobOrFileLikeObject matches a specific pattern.
 * If the input string satisfies the condition checked by `shouldStripEnclosingCharacters`,
 * returns the substring without the first and last character. Otherwise, returns the original string.
 *
 * @param {string} inputString - The string to potentially strip enclosing characters from.
 * @returns {string} The processed string, with enclosing characters removed if applicable.
 */
function stripEnclosingCharactersIfNeeded(inputString) {
  // Check if the string should have its enclosing characters stripped
  if (shouldStripEnclosingCharacters(inputString)) {
    // Remove the first and last character
    return inputString.substr(1, inputString.length - 2);
  } else {
    // Return the original string if no stripping is needed
    return inputString;
  }
}

module.exports = stripEnclosingCharactersIfNeeded;
