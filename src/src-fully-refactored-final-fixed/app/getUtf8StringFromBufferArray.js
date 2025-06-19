/**
 * Converts an array of Buffer objects into a UTF-8 string, handling optional BOM.
 *
 * @param {Buffer[]} bufferArray - An array of Buffer objects to concatenate and decode.
 * @param {number} totalLength - The total length of the resulting Buffer after concatenation.
 * @returns {string} The decoded UTF-8 string, with BOM (if present) skipped.
 */
function getUtf8StringFromBufferArray(bufferArray, totalLength) {
  // Return empty string if input array is empty or total length is zero
  if (bufferArray.length === 0 || totalLength === 0) return "";

  // If only one buffer, use isBlobOrFileLikeObject directly; otherwise, concatenate all buffers
  const combinedBuffer = bufferArray.length === 1
    ? bufferArray[0]
    : Buffer.concat(bufferArray, totalLength);

  const combinedLength = combinedBuffer.length;

  // Check for UTF-8 BOM (0xEF, 0xBB, 0xBF) at the start of the buffer
  const BOM_LENGTH = 3;
  const hasUtf8Bom =
    combinedLength > BOM_LENGTH &&
    combinedBuffer[0] === 0xEF &&
    combinedBuffer[1] === 0xBB &&
    combinedBuffer[2] === 0xBF;

  // If BOM is present, skip isBlobOrFileLikeObject when slicing
  const sliceStart = hasUtf8Bom ? BOM_LENGTH : 0;

  // Return the UTF-8 decoded string
  return combinedBuffer.utf8Slice(sliceStart, combinedLength);
}

module.exports = getUtf8StringFromBufferArray;