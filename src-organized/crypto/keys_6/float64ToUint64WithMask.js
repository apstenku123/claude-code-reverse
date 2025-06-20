/**
 * Converts a 64-bit floating-point number to a 64-bit unsigned integer,
 * applying a bitmask to the high 32 bits before combining with the low 32 bits.
 *
 * @param {number} floatValue - The 64-bit floating-point number to convert.
 * @returns {number} The resulting 64-bit unsigned integer as a Number.
 */
function float64ToUint64WithMask(floatValue) {
  // Create an 8-byte buffer and a DataView to manipulate its contents
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);

  // Store the float64 value into the buffer
  dataView.setFloat64(0, floatValue);

  // Extract the high and low 32 bits as unsigned integers
  const highBits = dataView.getUint32(0); // Most significant 32 bits
  const lowBits = dataView.getUint32(4);  // Least significant 32 bits

  // Apply the tb4 bitmask to the high bits, then combine with the low bits
  // (highBits & tb4) << 32 may overflow, so use Math.pow(2, 32)
  const maskedHighBits = highBits & tb4;
  const combinedUint64 = maskedHighBits * Math.pow(2, 32) + lowBits;

  return combinedUint64;
}

module.exports = float64ToUint64WithMask;