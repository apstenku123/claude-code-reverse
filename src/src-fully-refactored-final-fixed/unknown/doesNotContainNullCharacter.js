/**
 * Checks if the input string does not contain any null (\x00) characters.
 *
 * @param {string} inputString - The string to check for null characters.
 * @returns {boolean} True if the string does NOT contain a null character, false otherwise.
 */
function doesNotContainNullCharacter(inputString) {
  // indexOf returns -1 if the substring is not found
  return inputString.indexOf("\x00") === -1;
}

module.exports = doesNotContainNullCharacter;