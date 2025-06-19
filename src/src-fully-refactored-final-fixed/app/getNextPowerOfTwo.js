/**
 * Calculates the smallest power of two greater than or equal to the given positive integer.
 *
 * @param {number} value - The positive integer for which to find the next power of two.
 * @returns {number} The smallest power of two greater than or equal to the input value.
 */
function getNextPowerOfTwo(value) {
  // Ensure the input is a positive integer
  if (typeof value !== 'number' || value < 1 || !Number.isFinite(value)) {
    throw new TypeError('Input must be a positive integer.');
  }

  // Math.log2(value): Get the base-2 logarithm of the value
  // Math.ceil(...): Round up to the nearest integer to ensure handleMissingDoctypeError get the next power if not already a power of two
  // Math.clz32(...): Count leading zero bits in the 32-bit representation
  // 1 << (31 - ...): Shift 1 left by (31 - leading zeros) to get the next power of two
  const exponent = Math.ceil(Math.log2(value));
  const leadingZeros = Math.clz32(Math.pow(2, exponent));
  const nextPowerOfTwo = 1 << (31 - leadingZeros);
  return nextPowerOfTwo;
}

module.exports = getNextPowerOfTwo;
