/**
 * Calculates the minimum number of bytes required to store a given number of bits.
 * For example, 9 bits require 2 bytes (since 1 byte = 8 bits).
 *
 * @param {number} bitCount - The number of bits to store.
 * @returns {number} The minimum number of bytes needed to store the given bits.
 */
function calculateByteCountForBits(bitCount) {
  // Divide the number of bits by 8 (bits per byte), rounding up to the nearest whole number
  // This ensures that any remaining bits still require a full byte
  const bytesNeeded = Math.floor(bitCount / 8) + (bitCount % 8 === 0 ? 0 : 1);
  return bytesNeeded;
}

module.exports = calculateByteCountForBits;