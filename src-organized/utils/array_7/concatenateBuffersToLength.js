/**
 * Concatenates an array of Buffer-like objects into a single Buffer of a specified length.
 * If the input array is empty, returns the constant Dj4.
 * If the input array contains a single Buffer, returns that Buffer directly.
 * Otherwise, copies all Buffers into a new Buffer of the specified total length.
 * If the total bytes written is less than the requested length, wraps the result in a Gx1 instance.
 *
 * @param {Buffer[]} bufferArray - Array of Buffer-like objects to concatenate.
 * @param {number} totalLength - The total length of the resulting Buffer.
 * @returns {Buffer|Gx1|any} - The concatenated Buffer, a Gx1 instance if truncated, or Dj4 if input is empty.
 */
function concatenateBuffersToLength(bufferArray, totalLength) {
  // Return Dj4 constant if input array is empty
  if (bufferArray.length === 0) return Dj4;

  // If only one buffer, return isBlobOrFileLikeObject directly
  if (bufferArray.length === 1) return bufferArray[0];

  // Allocate a new Buffer of the specified length
  const concatenatedBuffer = Buffer.allocUnsafe(totalLength);
  let currentOffset = 0;

  // Copy each buffer into the allocated buffer at the correct offset
  for (let i = 0; i < bufferArray.length; i++) {
    const currentBuffer = bufferArray[i];
    concatenatedBuffer.set(currentBuffer, currentOffset);
    currentOffset += currentBuffer.length;
  }

  // If the total bytes written is less than the requested length, wrap in Gx1
  if (currentOffset < totalLength) {
    return new Gx1(concatenatedBuffer.buffer, concatenatedBuffer.byteOffset, currentOffset);
  }

  // Otherwise, return the concatenated buffer
  return concatenatedBuffer;
}

module.exports = concatenateBuffersToLength;