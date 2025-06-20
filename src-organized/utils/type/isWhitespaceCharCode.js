/**
 * Checks if the provided character code corresponds to a whitespace character (space or tab).
 *
 * @param {number} charCode - The Unicode code of the character to check.
 * @returns {boolean} True if the character code is for space (32) or tab (9), otherwise false.
 */
function isWhitespaceCharCode(charCode) {
  // 32 is the char code for space, 9 is for tab
  return charCode === 32 || charCode === 9;
}

module.exports = isWhitespaceCharCode;