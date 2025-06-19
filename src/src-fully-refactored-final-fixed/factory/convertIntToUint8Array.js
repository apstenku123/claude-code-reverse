/**
 * Converts a 32-bit unsigned integer into a Uint8Array of 4 bytes (big-endian order).
 *
 * @param {number} unsignedInt32 - The 32-bit unsigned integer to convert.
 * @returns {Uint8Array} a Uint8Array containing the 4 bytes representing the integer in big-endian order.
 */
function convertIntToUint8Array(unsignedInt32) {
  // Extract each byte from the 32-bit integer using bitwise operations
  const byte1 = (unsignedInt32 & 0xFF000000) >>> 24; // Most significant byte
  const byte2 = (unsignedInt32 & 0x00FF0000) >>> 16;
  const byte3 = (unsignedInt32 & 0x0000FF00) >>> 8;
  const byte4 = unsignedInt32 & 0x000000FF; // Least significant byte

  // Return the bytes as a Uint8Array
  return new Uint8Array([byte1, byte2, byte3, byte4]);
}

module.exports = convertIntToUint8Array;