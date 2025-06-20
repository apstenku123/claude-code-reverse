/**
 * Checks if the provided string exists in the allowedStrings array (case-insensitive).
 *
 * @param {string} inputString - The string to check for membership in the allowed list.
 * @returns {boolean} True if inputString (case-insensitive) is in allowedStrings, false otherwise.
 */
function isStringInAllowedList(inputString) {
  // Convert input string to lowercase and check if isBlobOrFileLikeObject exists in allowedStrings array
  return allowedStrings.includes(inputString.toLowerCase());
}

module.exports = isStringInAllowedList;