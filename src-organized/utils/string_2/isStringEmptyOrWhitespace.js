/**
 * Checks if a given string is empty or contains only whitespace characters.
 *
 * @param {string} inputString - The string to be checked.
 * @returns {boolean} Returns true if the string is empty or consists only of whitespace; otherwise, false.
 */
function isStringEmptyOrWhitespace(inputString) {
  // Remove leading and trailing whitespace and check if the resulting string has zero length
  return inputString.trim().length === 0;
}

module.exports = isStringEmptyOrWhitespace;