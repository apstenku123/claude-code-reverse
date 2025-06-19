/**
 * Checks if the substring '!ELEMENT' appears at a specific index in the given string.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index at which to check for the '!ELEMENT' keyword.
 * @returns {boolean} True if '!ELEMENT' starts at inputString[startIndex + 1], otherwise false.
 */
function isElementKeywordAtPosition(inputString, startIndex) {
  // Define the keyword to search for
  const keyword = '!ELEMENT';
  // Check if the substring starting at startIndex + 1 matches the keyword
  const substring = inputString.substr(startIndex + 1, keyword.length);
  return substring === keyword;
}

module.exports = isElementKeywordAtPosition;