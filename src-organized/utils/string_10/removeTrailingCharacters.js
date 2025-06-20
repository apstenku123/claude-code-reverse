/**
 * Removes all trailing occurrences of a specified character from the end of a string.
 *
 * @param {string} inputString - The string to process.
 * @param {string} trailingChar - The character to remove from the end of the string.
 * @returns {string} The resulting string with trailing characters removed.
 */
function removeTrailingCharacters(inputString, trailingChar) {
  const inputLength = inputString.length;
  if (inputLength === 0) {
    return "";
  }

  let trailingCount = 0;
  // Count how many trailing characters match 'trailingChar'
  while (trailingCount < inputLength) {
    // Check character from the end
    if (inputString.charAt(inputLength - trailingCount - 1) === trailingChar) {
      trailingCount++;
    } else {
      break;
    }
  }

  // Remove the counted trailing characters
  return inputString.slice(0, inputLength - trailingCount);
}

module.exports = removeTrailingCharacters;