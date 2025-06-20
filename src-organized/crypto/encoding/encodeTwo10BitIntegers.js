/**
 * Encodes two 10-bit unsigned integers into a single integer value with an offset.
 *
 * Each input is masked to 10 bits (0-1023), the first is shifted left by 10 bits,
 * then both are summed together with a fixed offset of 65536.
 *
 * @param {number} firstValue - The first integer to encode (expected 0-1023).
 * @param {number} secondValue - The second integer to encode (expected 0-1023).
 * @returns {number} The encoded integer value.
 */
function encodeTwo10BitIntegers(firstValue, secondValue) {
  // Mask both values to 10 bits (0-1023)
  const maskedFirstValue = firstValue & 0x3FF; // 0x3FF == 1023
  const maskedSecondValue = secondValue & 0x3FF;

  // Shift the first value by 10 bits and add the second value
  const combinedValue = (maskedFirstValue << 10) + maskedSecondValue;

  // Add a fixed offset of 65536
  const encodedValue = combinedValue + 65536;

  return encodedValue;
}

module.exports = encodeTwo10BitIntegers;