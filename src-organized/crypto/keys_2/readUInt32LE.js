/**
 * Reads a 32-bit unsigned integer from a byte array in little-endian order.
 *
 * @param {Uint8Array | number[]} byteArray - The array of bytes to read from.
 * @param {number} startIndex - The starting index in the array to read the 4 bytes.
 * @returns {number} The 32-bit unsigned integer value constructed from the 4 bytes.
 */
function readUInt32LE(byteArray, startIndex) {
  // Combine 4 bytes into a 32-bit integer, little-endian order
  // (byteArray[startIndex] is least significant byte)
  const value = (
    byteArray[startIndex] |
    (byteArray[startIndex + 1] << 8) |
    (byteArray[startIndex + 2] << 16) |
    (byteArray[startIndex + 3] << 24)
  ) >>> 0; // Ensure unsigned 32-bit integer
  return value;
}

module.exports = readUInt32LE;