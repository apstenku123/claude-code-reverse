/**
 * Checks if the substring "!NOTATION" appears at a specific position in the given string.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} position - The index in the string to check for the start of "!NOTATION".
 * @returns {boolean} Returns true if "!NOTATION" is found at the specified position, otherwise false.
 */
function isNotationKeywordAtPosition(inputString, position) {
  // The keyword to search for, including the exclamation mark
  const NOTATION_KEYWORD = "!NOTATION";

  // Extract the substring from the input string starting at position + 1
  const substringToCheck = inputString.substr(position + 1, NOTATION_KEYWORD.length);

  // Check if the substring matches the keyword
  return substringToCheck === NOTATION_KEYWORD;
}

module.exports = isNotationKeywordAtPosition;