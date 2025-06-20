/**
 * Returns a specific value based on the least significant set bit of the input number.
 *
 * This function isolates the least significant set bit of the input integer and returns:
 *   - 1 if the bit is at position 0
 *   - 4 if the bit is at position 2
 *   - 16 if the bit is at position 4 or higher but within 28 bits
 *   - 536870912 if the bit is at position 29 or higher
 *
 * @param {number} inputNumber - The integer to analyze.
 * @returns {number} - a value determined by the position of the least significant set bit.
 */
function getLeastSignificantBitValue(inputNumber) {
  // Isolate the least significant set bit
  const leastSignificantBit = inputNumber & -inputNumber;

  // If the least significant bit is at position 0, return 1
  if (leastSignificantBit === 1) {
    return 1;
  }

  // If the least significant bit is at position 2, return 4
  if (leastSignificantBit === 4) {
    return 4;
  }

  // If the least significant bit is within the lower 28 bits, return 16
  // 0x0FFFFFFF = 268435455 (28 bits set)
  if ((leastSignificantBit & 0x0FFFFFFF) !== 0) {
    return 16;
  }

  // Otherwise, the least significant bit is at position 29 or higher, return 536870912
  return 536870912;
}

module.exports = getLeastSignificantBitValue;