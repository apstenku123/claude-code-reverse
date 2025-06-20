/**
 * Encodes a Uint8Array into a Base64 string.
 *
 * This function processes the input array in chunks for efficiency, handling any remaining bytes
 * at the end according to Base64 padding rules. It relies on the external 'fw' lookup table for
 * Base64 characters and the 'encodeByteArrayToBase64String' function for chunk encoding.
 *
 * @param {Uint8Array} byteArray - The array of bytes to encode.
 * @returns {string} The Base64-encoded string representation of the input array.
 */
function base64EncodeUint8Array(byteArray) {
  const CHUNK_SIZE = 16383; // Maximum chunk size for processing
  const base64Chars = fw; // External lookup table for Base64 characters
  const encodeChunk = encodeByteArrayToBase64String; // External function to encode a chunk of bytes

  const byteLength = byteArray.length;
  const remainder = byteLength % 3; // Number of bytes not fitting into a 3-byte group
  const base64Parts = [];

  // Process the main part of the array in chunks
  for (let offset = 0, chunkEnd = byteLength - remainder; offset < chunkEnd; offset += CHUNK_SIZE) {
    const end = Math.min(offset + CHUNK_SIZE, chunkEnd);
    base64Parts.push(encodeChunk(byteArray, offset, end));
  }

  // Handle the remaining 1 or 2 bytes (if any) and apply Base64 padding
  if (remainder === 1) {
    const lastByte = byteArray[byteLength - 1];
    base64Parts.push(
      base64Chars[lastByte >> 2] +
      base64Chars[(lastByte << 4) & 63] +
      '=='
    );
  } else if (remainder === 2) {
    const lastTwoBytes = (byteArray[byteLength - 2] << 8) + byteArray[byteLength - 1];
    base64Parts.push(
      base64Chars[lastTwoBytes >> 10] +
      base64Chars[(lastTwoBytes >> 4) & 63] +
      base64Chars[(lastTwoBytes << 2) & 63] +
      '='
    );
  }

  // Combine all parts into the final Base64 string
  return base64Parts.join('');
}

module.exports = base64EncodeUint8Array;