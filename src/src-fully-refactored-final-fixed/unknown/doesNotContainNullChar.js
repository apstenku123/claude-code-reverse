/**
 * Checks if the provided string does not contain any null (\x00) characters.
 *
 * @param {string} inputString - The string to check for null characters.
 * @returns {boolean} True if the string does not contain a null character, false otherwise.
 */
function doesNotContainNullChar(inputString) {
  // indexOf returns -1 if the substring is not found
  return inputString.indexOf("\x00") === -1;
}

module.exports = doesNotContainNullChar;