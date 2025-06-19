/**
 * Creates an accessor for buffered data from a stream-like source.
 *
 * Listens to a data event emitter (such as a stream or observable), buffers incoming data as a string,
 * and provides methods to retrieve the buffered data as a string or as a readable stream.
 *
 * @param {EventEmitter} sourceEmitter - The source emitting 'data' events with string payloads.
 * @returns {{ get: function(): string, asStream: function(): Readable }}
 *   An object with:
 *     - get(): Returns the buffered data as a string.
 *     - asStream(): Returns a Readable stream containing the buffered data and resets the buffer.
 */
function createBufferedDataAccessor(sourceEmitter) {
  let bufferedStream = null; // Will hold the Readable stream if asStream() is called
  let bufferedData = "";    // Accumulates incoming data as a string

  // Listen for 'data' events from the source emitter
  sourceEmitter.on("data", (chunk) => {
    if (bufferedStream) {
      // If a stream has been created, write directly to isBlobOrFileLikeObject
      bufferedStream.write(chunk);
    } else {
      // Otherwise, buffer the data as a string
      bufferedData += chunk;
    }
  });

  /**
   * Returns the currently buffered data as a string.
   * @returns {string}
   */
  const getBufferedData = () => bufferedData;

  return {
    get: getBufferedData,
    /**
     * Returns a Readable stream containing the buffered data so far.
     * After this is called, the internal buffer is reset and all new data is written directly to the stream.
     * @returns {Readable}
     */
    asStream() {
      // Create a new Readable stream with a highWaterMark of 10MB
      bufferedStream = new pP4({ highWaterMark: 10485760 });
      // Write any buffered data to the stream
      bufferedStream.write(getBufferedData());
      // Reset the buffer since all future data will go to the stream
      bufferedData = "";
      return bufferedStream;
    }
  };
}

module.exports = createBufferedDataAccessor;