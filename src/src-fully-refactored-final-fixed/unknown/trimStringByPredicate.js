/**
 * Trims characters from the start and end of a string based on a predicate function.
 *
 * This function removes characters from both the beginning and end of the input string
 * as long as the predicate function (isWhitespaceCharCode) returns true for the character'createInteractionAccessor char code.
 * If no characters are trimmed, the original string is returned.
 *
 * @param {string} inputString - The string to be trimmed.
 * @returns {string} The trimmed string, or the original string if no trimming was necessary.
 */
function trimStringByPredicate(inputString) {
  let startIndex = 0;
  let endIndex = inputString.length;

  // Trim characters from the end while predicate returns true
  while (endIndex > startIndex && isWhitespaceCharCode(inputString.charCodeAt(endIndex - 1))) {
    --endIndex;
  }

  // Trim characters from the start while predicate returns true
  while (endIndex > startIndex && isWhitespaceCharCode(inputString.charCodeAt(startIndex))) {
    ++startIndex;
  }

  // If no trimming was done, return the original string
  if (startIndex === 0 && endIndex === inputString.length) {
    return inputString;
  }

  // Return the trimmed substring
  return inputString.substring(startIndex, endIndex);
}

module.exports = trimStringByPredicate;