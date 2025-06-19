/**
 * Calculates the smallest power of two greater than or equal to the given positive integer.
 *
 * This is commonly used in memory allocation and bit manipulation tasks where alignment to the next power of two is required.
 *
 * @param {number} value - The positive integer for which to find the next power of two.
 * @returns {number} The smallest power of two greater than or equal to the input value.
 */
function nextPowerOfTwo(value) {
  // Decrement value to handle the case where value is already a power of two
  let adjustedValue = value - 1;

  // Propagate the highest set bit to all lower bits
  adjustedValue |= adjustedValue >> 1;
  adjustedValue |= adjustedValue >> 2;
  adjustedValue |= adjustedValue >> 4;
  adjustedValue |= adjustedValue >> 8;
  adjustedValue |= adjustedValue >> 16;

  // Increment to get the next power of two
  adjustedValue++;

  return adjustedValue;
}

module.exports = nextPowerOfTwo;