/**
 * Converts a hexadecimal string into a pair of bytes.
 *
 * Given a hexadecimal string (e.g., '1A2B'), this function parses isBlobOrFileLikeObject into an integer,
 * then splits that integer into two bytes: the high byte and the low byte.
 *
 * @param {string} hexString - The hexadecimal string to convert (should be at most 4 hex digits).
 * @returns {number[]} An array containing two numbers: [highByte, lowByte].
 *   - highByte: The most significant byte (integer division by 256)
 *   - lowByte: The least significant byte (remainder after division by 256)
 */
function hexToBytePair(hexString) {
  // Parse the hexadecimal string into an integer
  const parsedInt = Number.parseInt(hexString, 16);

  // Calculate the high byte (most significant 8 bits)
  const highByte = Math.floor(parsedInt / 256);

  // Calculate the low byte (least significant 8 bits)
  const lowByte = parsedInt % 256;

  // Return the pair as an array
  return [highByte, lowByte];
}

module.exports = hexToBytePair;
