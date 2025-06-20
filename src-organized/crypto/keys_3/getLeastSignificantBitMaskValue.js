/**
 * Returns a specific value based on the least significant set bit of the input number.
 *
 * This function isolates the least significant set bit of the input integer and returns:
 *   - 1 if the bit is at position 0
 *   - 4 if the bit is at position 2
 *   - 16 if the bit is at position 4 or higher but within the lower 28 bits
 *   - 536870912 if the bit is at position 29 or higher
 *
 * @param {number} inputNumber - The integer to analyze.
 * @returns {number} Returns 1, 4, 16, or 536870912 depending on the position of the least significant set bit.
 */
function getLeastSignificantBitMaskValue(inputNumber) {
  // Isolate the least significant set bit
  const leastSignificantBit = inputNumber & -inputNumber;

  if (leastSignificantBit > 1) {
    if (leastSignificantBit > 4) {
      // If the bit is set within the lower 28 bits (mask: 0x0FFFFFFF)
      if ((leastSignificantBit & 0x0FFFFFFF) !== 0) {
        return 16;
      } else {
        // If the bit is set at position 29 or higher
        return 536870912;
      }
    } else {
      // If the bit is at position 2
      return 4;
    }
  } else {
    // If the bit is at position 0
    return 1;
  }
}

module.exports = getLeastSignificantBitMaskValue;