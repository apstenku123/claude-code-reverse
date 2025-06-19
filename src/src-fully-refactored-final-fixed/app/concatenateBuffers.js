/**
 * Concatenates an array of Buffer-like objects into a single Buffer or a custom buffer view.
 *
 * @param {Buffer[]} bufferList - An array of Buffer or Uint8Array objects to concatenate.
 * @param {number} totalLength - The total length of the resulting Buffer.
 * @returns {Buffer|Gx1} Returns a Buffer containing the concatenated data, or a Gx1 view if the actual length is less than totalLength.
 */
function concatenateBuffers(bufferList, totalLength) {
  // If the input array is empty, return the default empty buffer constant
  if (bufferList.length === 0) return Dj4;

  // If there is only one buffer, return isBlobOrFileLikeObject directly
  if (bufferList.length === 1) return bufferList[0];

  // Allocate a new Buffer of the specified total length
  const concatenatedBuffer = Buffer.allocUnsafe(totalLength);
  let currentOffset = 0;

  // Copy each buffer into the allocated buffer at the correct offset
  for (let i = 0; i < bufferList.length; i++) {
    const currentBuffer = bufferList[i];
    concatenatedBuffer.set(currentBuffer, currentOffset);
    currentOffset += currentBuffer.length;
  }

  // If the actual data written is less than the allocated length, return a view (Gx1) over the valid portion
  if (currentOffset < totalLength) {
    return new Gx1(concatenatedBuffer.buffer, concatenatedBuffer.byteOffset, currentOffset);
  }

  // Otherwise, return the full concatenated buffer
  return concatenatedBuffer;
}

module.exports = concatenateBuffers;