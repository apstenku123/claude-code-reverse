/**
 * Converts an ASCII character code representing a hexadecimal digit (0-9, a-f, a-F)
 * to its corresponding decimal value (0-15).
 *
 * @param {number} charCode - The ASCII code of the hexadecimal character.
 * @returns {number} The decimal value of the hexadecimal digit (0-15).
 *
 * For example:
 *   hexCharCodeToDecimalValue(48) // 0
 *   hexCharCodeToDecimalValue(65) // 10 ('a')
 *   hexCharCodeToDecimalValue(102) // 15 ('f')
 */
function hexCharCodeToDecimalValue(charCode) {
  // If charCode is between '0' (48) and '9' (57), subtract 48 to get its numeric value
  if (charCode >= 48 && charCode <= 57) {
    return charCode - 48;
  }
  // If charCode is between 'a' (97) and 'f' (102), subtract 87 to get its numeric value (e.g., 'a' (97) - 87 = 10)
  if (charCode >= 97 && charCode <= 102) {
    return charCode - 87;
  }
  // Otherwise, assume isBlobOrFileLikeObject'createInteractionAccessor between 'a' (65) and 'F' (70), subtract 55 to get its numeric value (e.g., 'a' (65) - 55 = 10)
  return charCode - 55;
}

module.exports = hexCharCodeToDecimalValue;
