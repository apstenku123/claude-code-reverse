/**
 * Adds an ASCII offset of 32 to the provided character code.
 *
 * @param {number} characterCode - The ASCII code of a character to offset.
 * @returns {number} The resulting ASCII code after adding the offset of 32.
 */
function addAsciiOffset(characterCode) {
  // Add 32 to the input character code (commonly used to convert uppercase to lowercase letters in ASCII)
  return characterCode + 32;
}

module.exports = addAsciiOffset;