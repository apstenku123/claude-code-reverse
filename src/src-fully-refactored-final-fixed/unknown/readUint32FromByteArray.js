/**
 * Reads a 32-bit unsigned integer from a byte array starting at the specified offset.
 * The bytes are interpreted in big-endian order (most significant byte first).
 *
 * @param {Uint8Array | number[]} byteArray - The array containing the bytes to read from.
 * @param {number} offset - The starting index in the array to read the 4 bytes.
 * @returns {number} The 32-bit unsigned integer composed from the 4 bytes.
 */
function readUint32FromByteArray(byteArray, offset) {
  // Combine four consecutive bytes into a single 32-bit unsigned integer (big-endian)
  const value = (
    (byteArray[offset] << 24) |           // Most significant byte
    (byteArray[offset + 1] << 16) |       // Second byte
    (byteArray[offset + 2] << 8) |        // Third byte
    (byteArray[offset + 3])               // Least significant byte
  ) >>> 0; // Ensure unsigned 32-bit integer
  return value;
}

module.exports = readUint32FromByteArray;