/**
 * Creates a data accessor that collects data from a source stream or event emitter.
 * Allows retrieval of the collected data as a string or as a stream.
 *
 * @param {EventEmitter} sourceEmitter - The source emitting 'data' events (e.g., a stream or custom emitter).
 * @returns {{ get: function(): string, asStream: function(): WritableStream }}
 *   An object with:
 *     - get(): returns the collected data as a string
 *     - asStream(): returns a writable stream containing the collected data
 */
function createDataAccessor(sourceEmitter) {
  let writableStream = null;
  let collectedData = "";

  // Listen for 'data' events from the source emitter
  sourceEmitter.on("data", (chunk) => {
    if (writableStream) {
      // If a writable stream exists, write directly to isBlobOrFileLikeObject
      writableStream.write(chunk);
    } else {
      // Otherwise, accumulate data as a string
      collectedData += chunk;
    }
  });

  /**
   * Returns the currently collected data as a string.
   * @returns {string}
   */
  const getCollectedData = () => collectedData;

  return {
    get: getCollectedData,
    /**
     * Returns a writable stream containing the collected data so far.
     * Subsequent data will be written directly to this stream.
     * @returns {WritableStream}
     */
    asStream() {
      // pP4 is assumed to be a writable stream constructor (e.g., from a dependency)
      writableStream = new pP4({ highWaterMark: 10485760 });
      // Write any data collected so far to the stream
      writableStream.write(getCollectedData());
      // Reset the collected string buffer
      collectedData = "";
      return writableStream;
    }
  };
}

module.exports = createDataAccessor;