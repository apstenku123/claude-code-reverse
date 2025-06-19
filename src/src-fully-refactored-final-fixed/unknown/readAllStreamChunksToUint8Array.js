/**
 * Reads all chunks from a ReadableStream and concatenates them into a single Uint8Array.
 *
 * @param {ReadableStream<Uint8Array>} readableStream - The stream to read from.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing all concatenated data from the stream.
 */
async function readAllStreamChunksToUint8Array(readableStream) {
  const chunks = []; // Array to store each chunk read from the stream
  const reader = readableStream.getReader(); // Get a reader for the stream
  let isDone = false;
  let totalLength = 0; // Total length of all chunks

  // Read all chunks from the stream
  while (!isDone) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value); // Store the chunk
      totalLength += value.length; // Track total length
    }
    isDone = done;
  }

  // Concatenate all chunks into a single Uint8Array
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

module.exports = readAllStreamChunksToUint8Array;