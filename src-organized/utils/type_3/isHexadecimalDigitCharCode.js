/**
 * Checks if the given character code corresponds to a hexadecimal digit (0-9, a-F, a-f).
 *
 * @param {number} charCode - The character code to check (e.g., from 'a'.charCodeAt(0)).
 * @returns {boolean} True if the character code is a hexadecimal digit, false otherwise.
 */
function isHexadecimalDigitCharCode(charCode) {
  // Check for '0' (48) to '9' (57)
  const isDigit = charCode >= 48 && charCode <= 57;
  // Check for 'a' (65) to 'F' (70)
  const isUppercaseHex = charCode >= 65 && charCode <= 70;
  // Check for 'a' (97) to 'f' (102)
  const isLowercaseHex = charCode >= 97 && charCode <= 102;

  return isDigit || isUppercaseHex || isLowercaseHex;
}

module.exports = isHexadecimalDigitCharCode;