/**
 * Converts a 32-bit unsigned integer to a Uint8Array of 4 bytes (big-endian order).
 *
 * @param {number} int32Value - The 32-bit unsigned integer to convert.
 * @returns {Uint8Array} a Uint8Array containing the 4 bytes representing the integer in big-endian order.
 */
function int32ToUint8Array(int32Value) {
  // Extract each byte using bitwise operations and shift to correct position
  const byte1 = (int32Value & 0xFF000000) >>> 24; // Most significant byte
  const byte2 = (int32Value & 0x00FF0000) >>> 16;
  const byte3 = (int32Value & 0x0000FF00) >>> 8;
  const byte4 = int32Value & 0x000000FF; // Least significant byte

  // Create a Uint8Array from the extracted bytes
  return new Uint8Array([byte1, byte2, byte3, byte4]);
}

module.exports = int32ToUint8Array;