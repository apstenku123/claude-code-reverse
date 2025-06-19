/**
 * Checks if the given character code corresponds to a common ASCII whitespace character.
 *
 * Whitespace characters checked:
 * - Tab (9)
 * - Line Feed (10)
 * - Form Feed (12)
 * - Carriage Return (13)
 * - Space (32)
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is a whitespace character, false otherwise.
 */
function isWhitespaceCharCode(charCode) {
  // Check for ASCII whitespace character codes
  return (
    charCode === 9  || // Tab
    charCode === 10 || // Line Feed
    charCode === 12 || // Form Feed
    charCode === 13 || // Carriage Return
    charCode === 32    // Space
  );
}

module.exports = isWhitespaceCharCode;