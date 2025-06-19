/**
 * Determines if a given character code represents an ASCII hexadecimal digit (0-9, a-F, a-f).
 *
 * @param {number} charCode - The character code to check.
 * @returns {boolean} True if the character code is an ASCII hex digit, false otherwise.
 */
function isAsciiHexDigit(charCode) {
  // Check if the character code is an ASCII digit (0-9)
  if (isAsciiDigit(charCode)) {
    return true;
  }

  // Check if the character code is an uppercase hex letter (a-F)
  if (charCode >= 65 && charCode <= 70) {
    return true;
  }

  // Check if the character code is a lowercase hex letter (a-f)
  if (charCode >= 97 && charCode <= 102) {
    return true;
  }

  // Not a hex digit
  return false;
}

module.exports = isAsciiHexDigit;