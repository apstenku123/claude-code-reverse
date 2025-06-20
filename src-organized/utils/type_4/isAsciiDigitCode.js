/**
 * Checks if the provided character code corresponds to an ASCII digit (0-9).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is for an ASCII digit (0-9), otherwise false.
 */
function isAsciiDigitCode(charCode) {
  // ASCII codes for '0' and '9' are 48 and 57 respectively
  return charCode >= 48 && charCode <= 57;
}

module.exports = isAsciiDigitCode;