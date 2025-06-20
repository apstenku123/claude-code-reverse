/**
 * Checks if the provided character code corresponds to a common whitespace character.
 * Supported whitespace characters: space (32), tab (9), line feed (10), carriage return (13).
 *
 * @param {number} charCode - The Unicode code of the character to check.
 * @returns {boolean} True if the character code is a whitespace character; otherwise, false.
 */
function isWhitespaceCharacterCode(charCode) {
  // Check for carriage return (13), line feed (10), tab (9), or space (32)
  return charCode === 13 || charCode === 10 || charCode === 9 || charCode === 32;
}

module.exports = isWhitespaceCharacterCode;