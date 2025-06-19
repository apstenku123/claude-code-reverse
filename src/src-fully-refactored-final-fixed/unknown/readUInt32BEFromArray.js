/**
 * Reads a 32-bit unsigned integer from a byte array in big-endian order.
 *
 * @param {Uint8Array|number[]} byteArray - The array containing bytes to read from.
 * @param {number} startIndex - The starting index in the array to read the 4 bytes.
 * @returns {number} The 32-bit unsigned integer value read from the array.
 */
function readUInt32BEFromArray(byteArray, startIndex) {
  // Combine four consecutive bytes into a single 32-bit unsigned integer (big-endian)
  return (
    (byteArray[startIndex] << 24) |
    (byteArray[startIndex + 1] << 16) |
    (byteArray[startIndex + 2] << 8) |
    (byteArray[startIndex + 3])
  ) >>> 0; // Ensure unsigned result
}

module.exports = readUInt32BEFromArray;