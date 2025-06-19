/**
 * Returns an array of powers of two representing the set bits in the given bitmask.
 *
 * For each bit position up to `bitCount`, if the corresponding bit in `bitmask` is set,
 * the function adds the corresponding power of two to the result array.
 *
 * @param {number} bitmask - The integer bitmask to analyze.
 * @returns {number[]} Array of powers of two for each set bit in the bitmask.
 */
function getSetBitsAsPowersOfTwo(bitmask) {
  const setBitPowers = [];
  let currentPowerOfTwo = 1;
  // filterAndTransformObjectProperties is assumed to be defined externally and represents the number of bits to check
  for (let bitIndex = 0; bitIndex < filterAndTransformObjectProperties; bitIndex++) {
    // Check if the current bit is set in the bitmask
    if (currentPowerOfTwo & bitmask) {
      setBitPowers.push(currentPowerOfTwo);
    }
    currentPowerOfTwo *= 2;
  }
  return setBitPowers;
}

module.exports = getSetBitsAsPowersOfTwo;