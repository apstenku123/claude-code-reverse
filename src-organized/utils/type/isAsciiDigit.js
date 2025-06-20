/**
 * Checks if the given character code corresponds to an ASCII digit (0-9).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is an ASCII digit, false otherwise.
 */
function isAsciiDigit(charCode) {
  // ASCII codes for '0' and '9' are 48 and 57 respectively
  return charCode >= 48 && charCode <= 57;
}

module.exports = isAsciiDigit;