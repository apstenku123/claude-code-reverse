/**
 * Encodes two 10-bit integer values into a single integer with an offset.
 * 
 * The function takes two numbers, extracts their lower 10 bits, shifts the first value left by 10 bits,
 * adds the second value, and finally adds an offset of 65536. This is commonly used for compact encoding
 * of two small integers into a single value, possibly for serialization or protocol purposes.
 *
 * @param {number} firstValue - The first integer value to encode (only the lower 10 bits are used).
 * @param {number} secondValue - The second integer value to encode (only the lower 10 bits are used).
 * @returns {number} The encoded integer value combining both inputs with an offset.
 */
function encodeTwoTenBitValues(firstValue, secondValue) {
  // Mask to extract the lower 10 bits of each value
  const TEN_BIT_MASK = 0x3FF; // 1023 in decimal

  // Shift the first value'createInteractionAccessor lower 10 bits left by 10 positions
  const shiftedFirst = (firstValue & TEN_BIT_MASK) << 10;

  // Extract the lower 10 bits of the second value
  const maskedSecond = secondValue & TEN_BIT_MASK;

  // Add the shifted first value, masked second value, and the offset
  const OFFSET = 65536;
  return shiftedFirst + maskedSecond + OFFSET;
}

module.exports = encodeTwoTenBitValues;