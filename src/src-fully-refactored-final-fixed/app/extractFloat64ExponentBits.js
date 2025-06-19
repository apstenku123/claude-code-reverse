/**
 * Extracts the exponent bits from a 64-bit floating point number (IEEE 754 double precision),
 * applies a bitmask, shifts the result, and subtracts a bias value.
 *
 * @param {number} float64Value - The 64-bit floating point number to extract the exponent from.
 * @returns {number} The processed exponent bits after masking, shifting, and bias subtraction.
 *
 * External dependencies:
 *   - ob4: Bitmask to apply to the exponent bits (should be a 32-bit unsigned integer)
 *   - Gv1: Bias value to subtract from the extracted exponent (should be a number)
 */
function extractFloat64ExponentBits(float64Value) {
  // Create a DataView for an 8-byte buffer to store the float64 value
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);

  // Store the float64 value at byte offset 0
  dataView.setFloat64(0, float64Value);

  // Get the first 4 bytes as a 32-bit unsigned integer
  const highBits = dataView.getUint32(0);

  // Apply the exponent mask (ob4), shift right by 20 bits to get the exponent,
  // then subtract the bias (Gv1)
  const exponent = ((highBits & ob4) >> 20) - Gv1;

  return exponent;
}

module.exports = extractFloat64ExponentBits;