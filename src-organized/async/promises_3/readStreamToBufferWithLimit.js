/**
 * Reads data from a readable stream and returns a Uint8Array buffer, with an optional byte limit.
 * If the source is already a readable stream, delegates to ne9.headStream.
 *
 * @param {ReadableStream|Object} sourceStream - The source stream or object to read from.
 * @param {number} byteLimit - The maximum number of bytes to read from the stream.
 * @returns {Promise<Uint8Array>} Resolves with the buffered data as a Uint8Array.
 */
const readStreamToBufferWithLimit = (sourceStream, byteLimit) => {
  // If the source is already a readable stream, delegate to ne9.headStream
  if (ae9.isReadableStream(sourceStream)) {
    return ne9.headStream(sourceStream, byteLimit);
  }

  // Otherwise, pipe the source into a buffer collector with a limit
  return new Promise((resolve, reject) => {
    // JgA is assumed to be a custom buffer collector stream
    const bufferCollector = new JgA();
    bufferCollector.limit = byteLimit;

    // Pipe the source stream into the buffer collector
    sourceStream.pipe(bufferCollector);

    // Handle errors on the source stream
    sourceStream.on("error", (error) => {
      bufferCollector.end(); // Ensure the collector is closed
      reject(error);
    });

    // Handle errors on the buffer collector
    bufferCollector.on("error", reject);

    // When the buffer collector finishes, resolve with the concatenated buffer
    bufferCollector.on("finish", function () {
      // 'this.buffers' is assumed to be an array of Buffer objects
      const concatenatedBuffer = Buffer.concat(this.buffers);
      const uint8Array = new Uint8Array(concatenatedBuffer);
      resolve(uint8Array);
    });
  });
};

module.exports = readStreamToBufferWithLimit;