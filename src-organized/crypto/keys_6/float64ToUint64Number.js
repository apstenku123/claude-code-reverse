/**
 * Converts a 64-bit floating point number (double) to a 64-bit unsigned integer representation.
 * The function uses a DataView to interpret the bits of the float as two 32-bit unsigned integers,
 * applies a bitmask to the high 32 bits, and combines them into a single JavaScript Number.
 *
 * @param {number} floatValue - The 64-bit floating point number to convert.
 * @returns {number} The 64-bit unsigned integer representation as a JavaScript Number.
 */
function float64ToUint64Number(floatValue) {
  // Create a DataView for an 8-byte ArrayBuffer
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);

  // Store the float64 value into the buffer
  dataView.setFloat64(0, floatValue);

  // Read the high and low 32 bits as unsigned integers
  const highBits = dataView.getUint32(0); // Most significant 32 bits
  const lowBits = dataView.getUint32(4);  // Least significant 32 bits

  // Combine the two 32-bit values into a single 64-bit unsigned integer
  // tb4 is assumed to be a bitmask for the high bits (must be defined in the scope)
  // (highBits & tb4) * 2^32 + lowBits
  return ((highBits & tb4) * Math.pow(2, 32)) + lowBits;
}

module.exports = float64ToUint64Number;