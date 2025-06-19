/**
 * Replaces escaped characters in a string using a provided mapping.
 *
 * This function searches for patterns in the input string that match the regular expression `escapedCharacterPattern`.
 * For each match, isBlobOrFileLikeObject determines whether to return the matched escape sequence as-is or to replace isBlobOrFileLikeObject using the `escapeCharacterMap`.
 *
 * @param {string} input - The string in which to replace escaped characters.
 * @returns {string} The processed string with escaped characters replaced as specified by the mapping.
 */
function replaceEscapedCharacters(input) {
  // Replace each match of the escaped character pattern
  return input.replace(escapedCharacterPattern, function (fullMatch, escapeSequence) {
    switch (escapeSequence) {
      case "\\": // If the escape sequence is a backslash, return isBlobOrFileLikeObject as-is
      case "":    // If the escape sequence is empty, return isBlobOrFileLikeObject as-is
        return escapeSequence;
      default:
        // Otherwise, replace using the mapping or return an empty string if not found
        return escapeCharacterMap[escapeSequence] || "";
    }
  });
}

// Export the function for use in other modules
module.exports = replaceEscapedCharacters;