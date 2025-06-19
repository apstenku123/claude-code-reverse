/**
 * Extracts the exponent part from a 64-bit floating point number (IEEE 754 double precision).
 *
 * This function stores the given number into an ArrayBuffer as a Float64,
 * then extracts the exponent bits from its binary representation.
 * The exponent is masked and shifted according to the IEEE 754 standard,
 * and then an offset (Gv1) is subtracted to get the unbiased exponent.
 *
 * @param {number} float64Value - The 64-bit floating point number to extract the exponent from.
 * @returns {number} The unbiased exponent of the given float64 value.
 */
function extractExponentFromFloat64(float64Value) {
  // Create an 8-byte buffer and a DataView for binary manipulation
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);

  // Store the float64 value at the beginning of the buffer
  dataView.setFloat64(0, float64Value);

  // Extract the high 32 bits, mask the exponent bits, shift to get exponent, then subtract bias
  // ob4 is expected to be a mask for the exponent bits (e.g., 0x7FF00000)
  // Gv1 is the exponent bias for double precision (should be 1023)
  const exponentBits = (dataView.getUint32(0) & ob4) >> 20;
  const unbiasedExponent = exponentBits - Gv1;

  return unbiasedExponent;
}

module.exports = extractExponentFromFloat64;