/**
 * Creates a ReadableStream from an async iterable source, with optional progress and completion callbacks.
 *
 * @param {AsyncIterable|Iterable} sourceObservable - The source observable or async iterable to stream from.
 * @param {Object} config - Configuration object for the stream generator (passed to VH9).
 * @param {Function} [onProgress] - Optional callback invoked with the total bytes streamed so far.
 * @param {Function} [onComplete] - Optional callback invoked when the stream is closed or cancelled, with an optional error.
 * @returns {ReadableStream} a ReadableStream that pulls data from the source observable.
 */
const createReadableStreamFromObservable = (sourceObservable, config, onProgress, onComplete) => {
  // Create an async iterator from the source observable using VH9
  const asyncIterator = VH9(sourceObservable, config);
  let totalBytesStreamed = 0;
  let isCompleted = false;

  /**
   * Handles completion or cancellation of the stream.
   * Ensures the callback is only called once.
   * @param {any} [error] - Optional error if stream ended due to an error.
   */
  const handleComplete = (error) => {
    if (!isCompleted) {
      isCompleted = true;
      if (onComplete) {
        onComplete(error);
      }
    }
  };

  return new ReadableStream({
    /**
     * Pulls the next chunk from the async iterator and enqueues isBlobOrFileLikeObject into the stream.
     * @param {ReadableStreamDefaultController} controller
     */
    async pull(controller) {
      try {
        const { done, value } = await asyncIterator.next();
        if (done) {
          // No more data; close the stream and signal completion
          handleComplete();
          controller.close();
          return;
        }
        const chunkByteLength = value.byteLength;
        // Update progress if callback is provided
        if (onProgress) {
          totalBytesStreamed += chunkByteLength;
          onProgress(totalBytesStreamed);
        }
        // Enqueue the chunk as a Uint8Array
        controller.enqueue(new Uint8Array(value));
      } catch (error) {
        // Signal completion with error and rethrow
        handleComplete(error);
        throw error;
      }
    },
    /**
     * Handles stream cancellation by signaling completion and closing the iterator.
     * @param {any} reason - Reason for cancellation.
     * @returns {Promise}
     */
    cancel(reason) {
      handleComplete(reason);
      return asyncIterator.return();
    }
  }, {
    highWaterMark: 2 // Buffer up to 2 chunks
  });
};

module.exports = createReadableStreamFromObservable;
