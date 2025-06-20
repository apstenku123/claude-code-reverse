/**
 * Checks if the provided character code corresponds to an ASCII digit (0-9).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is between 48 ('0') and 57 ('9'), otherwise false.
 */
function isAsciiDigitCode(charCode) {
  // ASCII codes for '0' is 48 and '9' is 57
  return charCode >= 48 && charCode <= 57;
}

module.exports = isAsciiDigitCode;