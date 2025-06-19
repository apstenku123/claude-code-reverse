/**
 * Reads data from a ReadableStream until a specified byte limit is reached or the stream ends.
 *
 * @param {ReadableStream} stream - The ReadableStream to read from.
 * @param {number} byteLimit - The maximum number of bytes to read from the stream.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing the read bytes (up to the limit).
 */
async function readStreamUpToByteLimit(stream, byteLimit) {
  let totalBytesRead = 0;
  const chunks = [];
  const reader = stream.getReader();
  let isDone = false;

  // Read chunks from the stream until the byte limit is reached or the stream ends
  while (!isDone) {
    const { done, value: chunk } = await reader.read();
    if (chunk) {
      chunks.push(chunk);
      // Safely get the byteLength of the chunk (handles undefined/null)
      const chunkLength = chunk?.byteLength ?? 0;
      totalBytesRead += chunkLength;
    }
    if (totalBytesRead >= byteLimit) {
      break;
    }
    isDone = done;
  }

  reader.releaseLock();

  // Allocate a buffer for the result, up to the requested byte limit or the total bytes read
  const resultBuffer = new Uint8Array(Math.min(byteLimit, totalBytesRead));
  let bufferOffset = 0;

  // Copy chunks into the result buffer until filled
  for (const chunk of chunks) {
    const remainingSpace = resultBuffer.length - bufferOffset;
    if (chunk.byteLength > remainingSpace) {
      // Only copy the portion of the chunk that fits
      resultBuffer.set(chunk.subarray(0, remainingSpace), bufferOffset);
      break;
    } else {
      resultBuffer.set(chunk, bufferOffset);
    }
    bufferOffset += chunk.length;
  }

  return resultBuffer;
}

module.exports = readStreamUpToByteLimit;