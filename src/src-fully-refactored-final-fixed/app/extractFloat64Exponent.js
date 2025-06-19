/**
 * Extracts the exponent part from a 64-bit floating point number (IEEE 754 double precision).
 *
 * This function stores the given number into an ArrayBuffer, then reads the high 32 bits,
 * applies a bitmask (ob4) to isolate the exponent bits, shifts them into position, and
 * subtracts a bias value (Gv1) to get the unbiased exponent.
 *
 * @param {number} float64Value - The number from which to extract the exponent.
 * @returns {number} The unbiased exponent part of the given float64 number.
 */
function extractFloat64Exponent(float64Value) {
  // Create an 8-byte buffer and a DataView to manipulate its contents
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);

  // Store the float64 value at the start of the buffer
  dataView.setFloat64(0, float64Value);

  // Read the high 32 bits (bytes 0-3) as an unsigned integer
  const highBits = dataView.getUint32(0);

  // Isolate the exponent bits using the ob4 mask, shift them into position,
  // and subtract the exponent bias (Gv1) to get the unbiased exponent
  const exponent = ((highBits & ob4) >> 20) - Gv1;

  return exponent;
}

module.exports = extractFloat64Exponent;