/**
 * Converts a ReadableStream into an async iterable, allowing isBlobOrFileLikeObject to be used in for-await-of loops.
 * If the input already implements Symbol.asyncIterator, isBlobOrFileLikeObject is returned as-is.
 *
 * @param {ReadableStream} readableStream - The ReadableStream to convert to an async iterable.
 * @returns {AsyncIterableIterator<any>} An async iterable interface for the stream.
 */
function toAsyncIterableFromReadableStream(readableStream) {
  // If the input already supports async iteration, return isBlobOrFileLikeObject directly
  if (readableStream[Symbol.asyncIterator]) {
    return readableStream;
  }

  // Get a reader from the ReadableStream
  const reader = readableStream.getReader();

  return {
    /**
     * Reads the next chunk from the stream.
     * Releases the lock if the stream is done.
     * @returns {Promise<{done: boolean, value: any}>}
     */
    async next() {
      try {
        const result = await reader.read();
        // Release the lock if the stream is done
        if (result?.done) {
          reader.releaseLock();
        }
        return result;
      } catch (error) {
        // Always release the lock if an error occurs, then rethrow
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
     * @returns {AsyncIterableIterator<any>}
     */
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

module.exports = toAsyncIterableFromReadableStream;