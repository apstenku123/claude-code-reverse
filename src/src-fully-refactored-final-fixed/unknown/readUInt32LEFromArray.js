/**
 * Reads a 32-bit unsigned integer from a byte array in little-endian order.
 *
 * @param {Uint8Array|number[]} byteArray - The array containing the bytes to read from.
 * @param {number} startIndex - The index in the array where the 4-byte sequence starts (reads bytes at startIndex-4 to startIndex-1).
 * @returns {number} The 32-bit unsigned integer assembled from the 4 bytes in little-endian order.
 */
function readUInt32LEFromArray(byteArray, startIndex) {
  // Extract 4 bytes in little-endian order and combine them into a 32-bit unsigned integer
  // byteArray[startIndex - 4] is the least significant byte
  // byteArray[startIndex - 1] is the most significant byte
  const byte0 = byteArray[startIndex - 4]; // Least significant byte
  const byte1 = byteArray[startIndex - 3];
  const byte2 = byteArray[startIndex - 2];
  const byte3 = byteArray[startIndex - 1]; // Most significant byte

  // Combine bytes into a single 32-bit unsigned integer
  const uint32 = (byte0 | (byte1 << 8) | (byte2 << 16) | (byte3 << 24)) >>> 0;
  return uint32;
}

module.exports = readUInt32LEFromArray;