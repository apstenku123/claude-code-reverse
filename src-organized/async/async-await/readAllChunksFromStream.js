/**
 * Reads all Uint8Array chunks from a readable stream and concatenates them into a single Buffer.
 *
 * @async
 * @function readAllChunksFromStream
 * @param {Object} readableStream - An object with an async read() method that returns { done: boolean, value: Uint8Array }.
 * @returns {Promise<Buffer>} - a promise that resolves to a Buffer containing all concatenated chunks from the stream.
 * @throws {TypeError} - If a non-Uint8Array chunk is received.
 */
async function readAllChunksFromStream(readableStream) {
  const chunks = [];
  let totalLength = 0;

  // Continuously read from the stream until done
  while (true) {
    const { done, value: chunk } = await readableStream.read();

    if (done) {
      // All chunks have been read; concatenate and return as a Buffer
      return Buffer.concat(chunks, totalLength);
    }

    // Ensure the chunk is a Uint8Array (or Buffer)
    if (!UF6(chunk)) {
      throw new TypeError("Received non-Uint8Array chunk");
    }

    chunks.push(chunk);
    totalLength += chunk.length;
  }
}

module.exports = readAllChunksFromStream;