/**
 * Reads up to a specified number of bytes from a ReadableStream and returns them as a Uint8Array.
 *
 * @async
 * @param {ReadableStream<Uint8Array>} stream - The ReadableStream to read from.
 * @param {number} maxBytes - The maximum number of bytes to read from the stream.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing up to maxBytes bytes read from the stream.
 */
async function readUint8ArrayFromStream(stream, maxBytes) {
  let totalBytesRead = 0;
  const chunks = [];
  const reader = stream.getReader();
  let isDone = false;

  // Read chunks from the stream until handleMissingDoctypeError'removeTrailingCharacters read enough bytes or the stream ends
  while (!isDone) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value);
      // Use optional chaining and nullish coalescing to safely get byteLength
      totalBytesRead += (value?.byteLength) ?? 0;
    }
    // Stop reading if handleMissingDoctypeError'removeTrailingCharacters reached or exceeded the requested number of bytes
    if (totalBytesRead >= maxBytes) {
      break;
    }
    isDone = done;
  }

  reader.releaseLock();

  // Allocate a Uint8Array for the result, with a length up to maxBytes or totalBytesRead (whichever is smaller)
  const resultLength = Math.min(maxBytes, totalBytesRead);
  const result = new Uint8Array(resultLength);
  let offset = 0;

  // Copy bytes from the chunks into the result array
  for (const chunk of chunks) {
    const remainingSpace = result.length - offset;
    if (chunk.byteLength > remainingSpace) {
      // Only copy the portion of the chunk that fits
      result.set(chunk.subarray(0, remainingSpace), offset);
      break;
    } else {
      result.set(chunk, offset);
    }
    offset += chunk.length;
  }

  return result;
}

module.exports = readUint8ArrayFromStream;