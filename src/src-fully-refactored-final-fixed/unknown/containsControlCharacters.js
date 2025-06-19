/**
 * Checks if the input string contains any ASCII control characters.
 * Control characters are defined as characters with char codes:
 *   - 0 to 8 (inclusive)
 *   - 10 to 31 (inclusive)
 *   - 127 (DEL)
 *
 * @param {string} inputString - The string to check for control characters.
 * @returns {boolean} Returns true if any control character is found, otherwise false.
 */
function containsControlCharacters(inputString) {
  for (let index = 0; index < inputString.length; ++index) {
    const charCode = inputString.charCodeAt(index);
    // Check for ASCII control characters: 0-8, 10-31, or 127 (DEL)
    if (
      (charCode >= 0 && charCode <= 8) ||
      (charCode >= 10 && charCode <= 31) ||
      charCode === 127
    ) {
      return true;
    }
  }
  return false;
}

module.exports = containsControlCharacters;