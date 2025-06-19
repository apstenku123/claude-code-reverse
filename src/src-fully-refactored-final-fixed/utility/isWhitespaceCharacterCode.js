/**
 * Determines if the provided character code corresponds to a whitespace character (space or tab).
 *
 * @param {number} characterCode - The Unicode value of the character to check.
 * @returns {boolean} True if the character code is for space (32) or tab (9), otherwise false.
 */
function isWhitespaceCharacterCode(characterCode) {
  // Check if the character code is for space (32) or tab (9)
  return characterCode === 32 || characterCode === 9;
}

module.exports = isWhitespaceCharacterCode;