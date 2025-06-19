/**
 * Converts an ASCII character code representing a hexadecimal digit (0-9, a-f, a-F) to its decimal value.
 *
 * @param {number} asciiCharCode - The ASCII code of a single hexadecimal digit character.
 * @returns {number} The decimal value of the hexadecimal digit (0-15).
 *
 * @example
 * asciiHexCharCodeToDecimal(48); // returns 0 (for '0')
 * asciiHexCharCodeToDecimal(65); // returns 10 (for 'a')
 * asciiHexCharCodeToDecimal(102); // returns 15 (for 'f')
 */
function asciiHexCharCodeToDecimal(asciiCharCode) {
  // If the character code is for '0'-'9'
  if (asciiCharCode >= 48 && asciiCharCode <= 57) {
    return asciiCharCode - 48;
  }
  // If the character code is for 'a'-'f'
  if (asciiCharCode >= 97 && asciiCharCode <= 102) {
    return asciiCharCode - 87; // 'a' (97) - 87 = 10
  }
  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor 'a'-'F'
  return asciiCharCode - 55; // 'a' (65) - 55 = 10
}

module.exports = asciiHexCharCodeToDecimal;