/**
 * Encodes a Uint8Array or array of bytes into a Base64 string.
 *
 * This function processes the input byte array in chunks for efficiency, encoding each chunk
 * using a helper function (encodeByteArrayToBase64String), and handles any remaining bytes (1 or 2) at the end according
 * to Base64 padding rules. The encoding table is provided by the global 'fw' array.
 *
 * @param {Uint8Array|number[]} byteArray - The array of bytes to encode as Base64.
 * @returns {string} The Base64-encoded string representation of the input bytes.
 */
function base64EncodeByteArray(byteArray) {
  const base64ChunkSize = 16383; // Maximum chunk size for processing
  const base64Table = fw; // Base64 character lookup table (global)
  const totalLength = byteArray.length;
  const remainder = totalLength % 3; // Number of bytes not fitting into 3-byte groups
  const base64Chunks = [];
  const mainLength = totalLength - remainder; // Length up to the last full 3-byte group

  // Process the main part of the array in chunks for efficiency
  for (let start = 0; start < mainLength; start += base64ChunkSize) {
    // End index should not exceed mainLength
    const end = Math.min(start + base64ChunkSize, mainLength);
    // encodeByteArrayToBase64String encodes a slice of the byte array to Base64
    base64Chunks.push(encodeByteArrayToBase64String(byteArray, start, end));
  }

  // Handle remaining bytes (if any) and apply Base64 padding
  if (remainder === 1) {
    // One byte left: pad with '=='
    const lastByte = byteArray[totalLength - 1];
    base64Chunks.push(
      base64Table[lastByte >> 2] +
      base64Table[(lastByte << 4) & 63] +
      '=='
    );
  } else if (remainder === 2) {
    // Two bytes left: pad with '='
    const lastTwoBytes = (byteArray[totalLength - 2] << 8) + byteArray[totalLength - 1];
    base64Chunks.push(
      base64Table[lastTwoBytes >> 10] +
      base64Table[(lastTwoBytes >> 4) & 63] +
      base64Table[(lastTwoBytes << 2) & 63] +
      '='
    );
  }

  // Join all chunks into a single Base64 string
  return base64Chunks.join('');
}

module.exports = base64EncodeByteArray;