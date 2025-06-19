/**
 * Checks if the substring '!ATTLIST' appears at a specific position in a given string.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} position - The index in the string to check for the '!ATTLIST' keyword (expects the '!' at inputString[position + 1]).
 * @returns {boolean} True if '!ATTLIST' is found at the specified position, otherwise false.
 */
function isAtListKeywordAtPosition(inputString, position) {
  // Check for the exact sequence '!ATTLIST' starting at inputString[position + 1]
  const keyword = '!ATTLIST';
  for (let i = 0; i < keyword.length; i++) {
    if (inputString[position + 1 + i] !== keyword[i]) {
      return false;
    }
  }
  return true;
}

module.exports = isAtListKeywordAtPosition;