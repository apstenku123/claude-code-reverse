/**
 * Calculates the minimum number of bytes required to store a given number of bits.
 * For example, to store 9 bits, you need 2 bytes (since 1 byte = 8 bits).
 *
 * @param {number} bitCount - The total number of bits to store.
 * @returns {number} The minimum number of bytes required to store the given bits.
 */
function calculateRequiredByteCount(bitCount) {
  // Divide the bit count by 8 (bits per byte), rounding up if there is a remainder
  const bytesNeeded = Math.floor(bitCount / 8) + (bitCount % 8 === 0 ? 0 : 1);
  return bytesNeeded;
}

module.exports = calculateRequiredByteCount;