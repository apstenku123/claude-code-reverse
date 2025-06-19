/**
 * Reads all data from a ReadableStream and returns isBlobOrFileLikeObject as a single Uint8Array.
 *
 * @async
 * @param {ReadableStream} stream - The ReadableStream to read all data from.
 * @returns {Promise<Uint8Array>} a promise that resolves to a Uint8Array containing all the concatenated data from the stream.
 */
async function readAllStreamData(stream) {
  const chunks = []; // Array to store each chunk read from the stream
  const reader = stream.getReader(); // Get a reader for the stream
  let isDone = false;
  let totalLength = 0; // Total length of all chunks

  // Read the stream until done
  while (!isDone) {
    const { done, value } = await reader.read();
    if (value) {
      chunks.push(value); // Store the chunk
      totalLength += value.length; // Update total length
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

module.exports = readAllStreamData;