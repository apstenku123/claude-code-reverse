/**
 * Writes a 32-bit unsigned integer to a byte array in little-endian order.
 *
 * @param {number} value - The 32-bit unsigned integer to write.
 * @param {Uint8Array|number[]} byteArray - The array where the bytes will be written.
 * @param {number} startIndex - The starting index in the array to write the bytes.
 * @returns {void}
 *
 * The function writes the 4 bytes of the integer `value` into `byteArray` starting at `startIndex`,
 * using little-endian byte order (least significant byte first).
 */
function writeUInt32ToByteArray(value, byteArray, startIndex) {
  // Write least significant byte
  byteArray[startIndex] = value & 0xFF;
  // Write next byte
  byteArray[startIndex + 1] = (value >>> 8) & 0xFF;
  // Write next byte
  byteArray[startIndex + 2] = (value >>> 16) & 0xFF;
  // Write most significant byte
  byteArray[startIndex + 3] = (value >>> 24) & 0xFF;
}

module.exports = writeUInt32ToByteArray;