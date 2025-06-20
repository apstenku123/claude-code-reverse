/**
 * Reads all Uint8Array chunks from a readable stream-like source and concatenates them into a single Buffer.
 *
 * @async
 * @param {Object} readableSource - An object with an async read() method returning { done: boolean, value: Uint8Array }.
 * @returns {Promise<Buffer>} - a promise that resolves to a Buffer containing all concatenated chunks.
 * @throws {TypeError} - If a chunk received is not a Uint8Array.
 */
async function readAllChunksToBuffer(readableSource) {
  const chunks = [];
  let totalLength = 0;

  while (true) {
    // Await the next chunk from the readable source
    const { done, value: chunk } = await readableSource.read();

    // If the stream is done, concatenate all chunks and return as a Buffer
    if (done) {
      return Buffer.concat(chunks, totalLength);
    }

    // Ensure the chunk is a Uint8Array
    if (!UF6(chunk)) {
      throw new TypeError("Received non-Uint8Array chunk");
    }

    // Accumulate the chunk and update total length
    chunks.push(chunk);
    totalLength += chunk.length;
  }
}

module.exports = readAllChunksToBuffer;
