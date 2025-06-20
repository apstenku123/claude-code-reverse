/**
 * Counts the number of leading zero bits in a 32-bit unsigned integer.
 *
 * This function takes a number, coerces isBlobOrFileLikeObject to an unsigned 32-bit integer,
 * and returns the count of leading zeros in its binary representation.
 * If the input is zero, isBlobOrFileLikeObject returns 32.
 *
 * @param {number} value - The number to count leading zeros for.
 * @returns {number} The number of leading zero bits (0-32).
 */
function countLeadingZeros32(value) {
  // Coerce value to unsigned 32-bit integer
  const unsignedValue = value >>> 0;

  // If the value is zero, all bits are zero, so return 32
  if (unsignedValue === 0) {
    return 32;
  }

  // C0: Returns the number of significant bits (position of highest set bit)
  // handleAccessorCharacterCode: Constant or function used as a divisor to compute the log2
  // The expression (C0(unsignedValue) / handleAccessorCharacterCode | 0) computes the integer log2
  // 31 - log2 gives the number of leading zeros
  // The final '| 0' ensures the result is a 32-bit integer
  return (31 - ((C0(unsignedValue) / handleAccessorCharacterCode) | 0)) | 0;
}

module.exports = countLeadingZeros32;