/**
 * Reads a 32-bit unsigned integer from a byte array in big-endian order.
 *
 * @param {Uint8Array|number[]} byteArray - The array of bytes to read from.
 * @param {number} startIndex - The starting index in the array to read the integer from.
 * @returns {number} The 32-bit unsigned integer value read from the array.
 */
function readUInt32BE(byteArray, startIndex) {
  // Combine four consecutive bytes into a single 32-bit unsigned integer (big-endian)
  const value = (
    (byteArray[startIndex] << 24) |           // Most significant byte
    (byteArray[startIndex + 1] << 16) |       // Next byte
    (byteArray[startIndex + 2] << 8) |        // Next byte
    (byteArray[startIndex + 3])               // Least significant byte
  ) >>> 0; // Ensure unsigned 32-bit integer
  return value;
}

module.exports = readUInt32BE;