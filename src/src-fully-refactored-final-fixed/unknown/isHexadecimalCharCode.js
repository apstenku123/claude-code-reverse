/**
 * Checks if the provided character code corresponds to a hexadecimal digit (0-9, a-F, a-f).
 *
 * @param {number} charCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code is for a hexadecimal digit, otherwise false.
 */
function isHexadecimalCharCode(charCode) {
  // Check for '0'-'9' (char codes 48-57), 'a'-'F' (65-70), or 'a'-'f' (97-102)
  const isDigit = charCode >= 48 && charCode <= 57;
  const isUppercaseHex = charCode >= 65 && charCode <= 70;
  const isLowercaseHex = charCode >= 97 && charCode <= 102;
  return isDigit || isUppercaseHex || isLowercaseHex;
}

module.exports = isHexadecimalCharCode;