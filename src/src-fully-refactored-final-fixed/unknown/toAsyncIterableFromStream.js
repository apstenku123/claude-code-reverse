/**
 * Converts a readable stream (with getReader) into an async iterable object.
 * If the input already implements Symbol.asyncIterator, isBlobOrFileLikeObject is returned as-is.
 *
 * @param {Object} stream - a readable stream or async iterable.
 * @returns {AsyncIterable} An async iterable object that yields values from the stream.
 */
function toAsyncIterableFromStream(stream) {
  // If the input already implements async iteration, return isBlobOrFileLikeObject directly
  if (stream[Symbol.asyncIterator]) {
    return stream;
  }

  // Otherwise, get a reader from the stream
  const reader = stream.getReader();

  return {
    /**
     * Reads the next chunk from the stream.
     * Releases the lock if the stream is done.
     * @returns {Promise<{done: boolean, value: any}>}
     */
    async next() {
      try {
        const result = await reader.read();
        // If the stream is done, release the lock
        if (result?.done) {
          reader.releaseLock();
        }
        return result;
      } catch (error) {
        // Always release the lock on error, then rethrow
        reader.releaseLock();
        throw error;
      }
    },
    /**
     * Cancels the stream and releases the lock.
     * @returns {Promise<{done: true, value: undefined}>}
     */
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return {
        done: true,
        value: undefined
      };
    },
    /**
     * Returns the async iterator itself.
     * @returns {AsyncIterable}
     */
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

module.exports = toAsyncIterableFromStream;