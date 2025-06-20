/**
 * Converts a segment of a byte array to a Base64-encoded string.
 * Processes the input array in 3-byte chunks, encodes each chunk to a 4-character Base64 string,
 * and concatenates the results.
 *
 * @param {Uint8Array|number[]} byteArray - The source array of bytes to encode.
 * @param {number} startIndex - The starting index (inclusive) in the byte array.
 * @param {number} endIndex - The ending index (exclusive) in the byte array.
 * @returns {string} The Base64-encoded string representing the specified segment of the byte array.
 */
function encodeByteArrayToBase64String(byteArray, startIndex, endIndex) {
  const base64Chunks = [];
  // Process the byte array in 3-byte chunks
  for (let i = startIndex; i < endIndex; i += 3) {
    // Combine up to 3 bytes into a single 24-bit number
    const byte1 = (byteArray[i] << 16) & 0xff0000;
    const byte2 = ((byteArray[i + 1] || 0) << 8) & 0x00ff00;
    const byte3 = (byteArray[i + 2] || 0) & 0x0000ff;
    const combined = byte1 + byte2 + byte3;
    // Encode the 24-bit number into a 4-character Base64 string
    base64Chunks.push(encodeBase64Chunk(combined));
  }
  // Concatenate all Base64 chunks into a single string
  return base64Chunks.join("");
}

module.exports = encodeByteArrayToBase64String;