/**
 * Checks if the provided character code matches the allowed JSON character code.
 *
 * @param {number} characterCode - The character code to check against the allowed JSON character code.
 * @returns {boolean} True if the character code matches the allowed JSON character code, false otherwise.
 */
function isAllowedJsonCharacterCode(characterCode) {
  // Compare the global allowed JSON character code with the provided character code
  return isAllowedJsonCharacter === characterCode;
}

module.exports = isAllowedJsonCharacterCode;