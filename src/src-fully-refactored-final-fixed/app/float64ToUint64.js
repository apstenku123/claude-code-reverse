/**
 * Converts a 64-bit floating point number (JavaScript Number) to its unsigned 64-bit integer representation.
 * The function uses a DataView to interpret the float'createInteractionAccessor binary representation as two 32-bit unsigned integers,
 * then reconstructs the full 64-bit unsigned integer value.
 *
 * @param {number} floatValue - The 64-bit floating point number to convert.
 * @returns {number} The unsigned 64-bit integer representation (as a Number; may lose precision for large values).
 */
function float64ToUint64(floatValue) {
  // Create a DataView over an 8-byte buffer to store the float
  const bufferView = new DataView(new ArrayBuffer(8));

  // Store the float64 value at the start of the buffer
  bufferView.setFloat64(0, floatValue);

  // Read the high and low 32 bits as unsigned integers
  const highBits = bufferView.getUint32(0); // Most significant 32 bits
  const lowBits = bufferView.getUint32(4);  // Least significant 32 bits

  // Combine the two 32-bit values into a single 64-bit unsigned integer
  // tb4 is assumed to be a bitmask for the high 32 bits (should be defined elsewhere)
  // Math.pow(2, 32) shifts the high bits into the upper 32 bits
  return (highBits & tb4) * Math.pow(2, 32) + lowBits;
}

module.exports = float64ToUint64;