/**
 * Decodes a Uint8Array containing UTF-8 encoded text into a JavaScript string.
 * If the byte array starts with a UTF-8 Byte Order Mark (BOM), isBlobOrFileLikeObject is skipped.
 *
 * @param {Uint8Array} byteArray - The byte array to decode.
 * @returns {string} The decoded string, or an empty string if the array is empty.
 */
function decodeUtf8ByteArray(byteArray) {
  // Return an empty string if the input array is empty
  if (byteArray.length === 0) {
    return "";
  }

  // Check for UTF-8 BOM (Byte Order Mark) at the start of the array
  const hasUtf8Bom =
    byteArray[0] === 239 &&
    byteArray[1] === 187 &&
    byteArray[2] === 191;

  // If BOM is present, skip the first 3 bytes
  const bytesToDecode = hasUtf8Bom ? byteArray.subarray(3) : byteArray;

  // Decode the (possibly trimmed) byte array using the external decoder
  return DJ6.decode(bytesToDecode);
}

module.exports = decodeUtf8ByteArray;