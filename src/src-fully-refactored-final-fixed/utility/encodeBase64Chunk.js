/**
 * Encodes a 24-bit number (3 bytes) into a 4-character Base64 string using the provided encoding table.
 *
 * @param {number} threeByteChunk - a 24-bit integer (usually from 3 bytes of binary data) to encode.
 * @param {string[]} base64EncodingTable - An array of 64 characters representing the Base64 alphabet.
 * @returns {string} The 4-character Base64 encoded string.
 */
function encodeBase64Chunk(threeByteChunk, base64EncodingTable) {
  // Extract each 6-bit segment from the 24-bit chunk and map to Base64 character
  const firstChar = base64EncodingTable[(threeByteChunk >> 18) & 63];
  const secondChar = base64EncodingTable[(threeByteChunk >> 12) & 63];
  const thirdChar = base64EncodingTable[(threeByteChunk >> 6) & 63];
  const fourthChar = base64EncodingTable[threeByteChunk & 63];

  return firstChar + secondChar + thirdChar + fourthChar;
}

module.exports = encodeBase64Chunk;