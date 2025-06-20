/**
 * Converts an ASCII character code representing a hexadecimal digit (0-9, a-f, a-F)
 * to its corresponding decimal value (0-15).
 *
 * @param {number} charCode - The ASCII code of the hexadecimal character.
 * @returns {number} The decimal value of the hexadecimal digit (0-15).
 */
function hexCharCodeToDecimal(charCode) {
  // If the character code is for '0'-'9'
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  // If the character code is for 'a'-'f'
  if (charCode >= 97 && charCode <= 102) {
    return charCode - 87; // 'a' (97) - 87 = 10
  }
  // Otherwise, assume isBlobOrFileLikeObject is 'a'-'F'
  return charCode - 55; // 'a' (65) - 55 = 10
}

module.exports = hexCharCodeToDecimal;
