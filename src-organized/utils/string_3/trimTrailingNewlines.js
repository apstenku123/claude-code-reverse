/**
 * Removes all trailing newline (\n) characters from the end of the input string.
 *
 * @param {string} inputString - The string from which to remove trailing newlines.
 * @returns {string} The input string with all trailing newline characters removed.
 */
function trimTrailingNewlines(inputString) {
  let trimmedLength = inputString.length;
  // Decrement trimmedLength while the character before isBlobOrFileLikeObject is a newline
  while (trimmedLength > 0 && inputString[trimmedLength - 1] === '\n') {
    trimmedLength--;
  }
  // Return the substring up to the last non-newline character
  return inputString.substring(0, trimmedLength);
}

module.exports = trimTrailingNewlines;