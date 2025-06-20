/**
 * Checks if the substring '!ELEMENT' appears at a specific index in a given string.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index to start checking from. The function checks if '!ELEMENT' starts at inputString[startIndex + 1].
 * @returns {boolean} Returns true if '!ELEMENT' is found at the specified position, otherwise false.
 */
function isElementKeywordAtIndex(inputString, startIndex) {
  // Define the keyword to search for
  const keyword = '!ELEMENT';
  // Check if the substring starting at startIndex + 1 matches '!ELEMENT'
  for (let i = 0; i < keyword.length; i++) {
    if (inputString[startIndex + 1 + i] !== keyword[i]) {
      return false;
    }
  }
  return true;
}

module.exports = isElementKeywordAtIndex;