/**
 * Reads all chunks from a ReadableStream and concatenates them into a single Uint8Array.
 *
 * @async
 * @param {ReadableStream} readableStream - The ReadableStream to read from.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing all the concatenated data from the stream.
 */
async function readStreamToUint8Array(readableStream) {
  const chunks = [];
  const reader = readableStream.getReader();
  let totalLength = 0;
  let isDone = false;

  // Read all chunks from the stream
  while (!isDone) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value);
      totalLength += value.length;
    }
    isDone = done;
  }

  // Allocate a Uint8Array of the total length
  const result = new Uint8Array(totalLength);
  let offset = 0;

  // Copy each chunk into the result array
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

module.exports = readStreamToUint8Array;