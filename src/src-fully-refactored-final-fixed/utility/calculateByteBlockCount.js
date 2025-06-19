/**
 * Calculates the minimum number of 8-byte blocks required to store a given number of bytes.
 *
 * For example, if you have 17 bytes, you need 3 blocks of 8 bytes each (since 2 blocks = 16 bytes, which is not enough).
 *
 * @param {number} byteCount - The total number of bytes to be stored.
 * @returns {number} The minimum number of 8-byte blocks required.
 */
function calculateByteBlockCount(byteCount) {
  // Divide the total bytes by 8 to get the number of full blocks
  // If there is a remainder, add one more block to accommodate the extra bytes
  const blocks = Math.floor(byteCount / 8) + (byteCount % 8 === 0 ? 0 : 1);
  return blocks;
}

module.exports = calculateByteBlockCount;