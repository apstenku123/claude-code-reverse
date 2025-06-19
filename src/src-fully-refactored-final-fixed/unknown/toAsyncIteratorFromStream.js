/**
 * Converts a readable stream (with getReader) into an async iterator compatible object.
 * If the input already implements Symbol.asyncIterator, isBlobOrFileLikeObject is returned as-is.
 *
 * @param {Object} readableStream - An object representing a readable stream, expected to have a getReader() method.
 * @returns {AsyncIterableIterator<any>} An async iterator interface for the stream.
 */
function toAsyncIteratorFromStream(readableStream) {
  // If the input already supports async iteration, return isBlobOrFileLikeObject directly
  if (readableStream[Symbol.asyncIterator]) {
    return readableStream;
  }

  // Get a reader from the stream
  const streamReader = readableStream.getReader();

  return {
    /**
     * Reads the next chunk from the stream.
     * Releases the lock if the stream is done.
     * @returns {Promise<{done: boolean, value: any}>}
     */
    async next() {
      try {
        const result = await streamReader.read();
        // If the stream is done, release the lock
        if (result?.done) {
          streamReader.releaseLock();
        }
        return result;
      } catch (error) {
        // Always release the lock on error, then rethrow
        streamReader.releaseLock();
        throw error;
      }
    },

    /**
     * Cancels the stream reader and releases the lock.
     * @returns {Promise<{done: true, value: undefined}>}
     */
    async return() {
      const cancelPromise = streamReader.cancel();
      // Release the lock after canceling
      streamReader.releaseLock();
      await cancelPromise;
      return {
        done: true,
        value: undefined
      };
    },

    /**
     * Returns itself as the async iterator.
     * @returns {AsyncIterableIterator<any>}
     */
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

module.exports = toAsyncIteratorFromStream;