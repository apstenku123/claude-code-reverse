/**
 * Checks if the provided character code corresponds to a hexadecimal digit (0-9, a-F, a-f).
 *
 * @param {number} characterCode - The Unicode code point of the character to check.
 * @returns {boolean} True if the code represents a hexadecimal digit, false otherwise.
 */
function isHexadecimalCharacterCode(characterCode) {
  // Check for '0'-'9' (ASCII 48-57), 'a'-'F' (ASCII 65-70), or 'a'-'f' (ASCII 97-102)
  const isDigit = characterCode >= 48 && characterCode <= 57;
  const isUppercaseHex = characterCode >= 65 && characterCode <= 70;
  const isLowercaseHex = characterCode >= 97 && characterCode <= 102;
  return isDigit || isUppercaseHex || isLowercaseHex;
}

module.exports = isHexadecimalCharacterCode;