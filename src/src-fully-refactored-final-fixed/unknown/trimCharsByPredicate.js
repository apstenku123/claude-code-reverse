/**
 * Trims characters from the start and end of a string based on a predicate function.
 * The predicate function (isWhitespaceCharCode) determines which characters to trim by evaluating the character code.
 * If no characters are trimmed, the original string is returned.
 *
 * @param {string} inputString - The string to trim.
 * @returns {string} The trimmed string, or the original string if no trimming was necessary.
 */
function trimCharsByPredicate(inputString) {
  let startIndex = 0;
  let endIndex = inputString.length;

  // Trim characters from the end while the predicate returns true
  while (endIndex > startIndex && isWhitespaceCharCode(inputString.charCodeAt(endIndex - 1))) {
    --endIndex;
  }

  // Trim characters from the start while the predicate returns true
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

module.exports = trimCharsByPredicate;