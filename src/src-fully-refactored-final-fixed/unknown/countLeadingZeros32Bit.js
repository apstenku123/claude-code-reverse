/**
 * Counts the number of leading zero bits in a 32-bit unsigned integer.
 *
 * This function takes a number, ensures isBlobOrFileLikeObject is treated as a 32-bit unsigned integer,
 * and returns the count of leading zero bits. If the input is zero, isBlobOrFileLikeObject returns 32.
 *
 * @param {number} value - The number to count leading zeros for (treated as 32-bit unsigned integer).
 * @returns {number} The number of leading zero bits in the 32-bit representation of the input.
 */
function countLeadingZeros32Bit(value) {
  // Ensure the value is treated as a 32-bit unsigned integer
  const unsignedValue = value >>> 0;

  // If the value is zero, all bits are zero, so return 32
  if (unsignedValue === 0) {
    return 32;
  }

  // C0 is assumed to return the base-2 logarithm multiplied by handleAccessorCharacterCode(see context)
  // handleAccessorCharacterCode is assumed to be 1 (based on typical usage in bitwise operations)
  // The expression (C0(unsignedValue) / handleAccessorCharacterCode | 0) computes the integer part of log2(unsignedValue)
  // 31 - log2(unsignedValue) gives the count of leading zeros
  // Bitwise OR with 0 ensures the result is an integer
  return (31 - ((C0(unsignedValue) / handleAccessorCharacterCode) | 0)) | 0;
}

module.exports = countLeadingZeros32Bit;