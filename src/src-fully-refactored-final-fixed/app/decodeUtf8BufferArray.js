/**
 * Decodes a UTF-8 encoded buffer or array of buffers, handling optional BOM.
 *
 * @param {Buffer[]|Buffer} bufferArray - An array of Buffers or a single Buffer to decode.
 * @param {number} totalLength - The total length of the concatenated buffer. Required if bufferArray is an array.
 * @returns {string} The decoded UTF-8 string, with BOM removed if present.
 */
function decodeUtf8BufferArray(bufferArray, totalLength) {
  // Return empty string if input is empty or totalLength is zero
  if (bufferArray.length === 0 || totalLength === 0) return "";

  // If only one buffer, use isBlobOrFileLikeObject directly; otherwise, concatenate buffers
  const combinedBuffer = bufferArray.length === 1
    ? bufferArray[0]
    : Buffer.concat(bufferArray, totalLength);

  const bufferLength = combinedBuffer.length;

  // Check for UTF-8 BOM (0xEF, 0xBB, 0xBF) at the start of the buffer
  const bomOffset =
    bufferLength > 2 &&
    combinedBuffer[0] === 0xEF &&
    combinedBuffer[1] === 0xBB &&
    combinedBuffer[2] === 0xBF
      ? 3
      : 0;

  // Decode buffer to string, skipping BOM if present
  return combinedBuffer.utf8Slice(bomOffset, bufferLength);
}

module.exports = decodeUtf8BufferArray;