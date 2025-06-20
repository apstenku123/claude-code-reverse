/**
 * Converts a segment of a byte array into a Base64-encoded string.
 * Processes the input array in 3-byte chunks, encodes each chunk using the provided encodeBase64Chunk function,
 * and concatenates the resulting Base64 string segments.
 *
 * @param {number[]} byteArray - The source array of bytes to encode.
 * @param {number} startIndex - The starting index (inclusive) in the byte array to begin encoding.
 * @param {number} endIndex - The ending index (exclusive) in the byte array to stop encoding.
 * @returns {string} The Base64-encoded string representing the specified segment of the byte array.
 */
function encodeByteArrayToBase64Chunks(byteArray, startIndex, endIndex) {
  const base64Chunks = [];

  // Iterate over the byte array in 3-byte chunks
  for (let i = startIndex; i < endIndex; i += 3) {
    // Combine up to three bytes into a single 24-bit integer
    // Use 0 for missing bytes at the end (if any)
    const byte1 = byteArray[i]     || 0;
    const byte2 = byteArray[i + 1] || 0;
    const byte3 = byteArray[i + 2] || 0;
    const combined = (byte1 << 16) | (byte2 << 8) | byte3;

    // Encode the 24-bit integer into a 4-character Base64 chunk
    base64Chunks.push(encodeBase64Chunk(combined));
  }

  // Concatenate all Base64 chunks into a single string
  return base64Chunks.join("");
}

module.exports = encodeByteArrayToBase64Chunks;