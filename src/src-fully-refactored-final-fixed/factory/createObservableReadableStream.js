/**
 * Creates a ReadableStream from an observable-like source, allowing streaming of data chunks.
 * Optionally tracks the total bytes streamed and invokes callbacks on data or error events.
 *
 * @param {any} sourceObservable - The source observable or async iterable to stream from.
 * @param {any} config - Configuration object passed to the source generator factory.
 * @param {function} [onProgress] - Optional callback invoked with the total bytes streamed after each chunk.
 * @param {function} [onCompleteOrError] - Optional callback invoked when the stream completes or errors.
 * @returns {ReadableStream} a ReadableStream that streams data from the source observable.
 */
function createObservableReadableStream(sourceObservable, config, onProgress, onCompleteOrError) {
  // Create an async iterator/generator from the source observable
  const sourceIterator = VH9(sourceObservable, config);
  let totalBytesStreamed = 0;
  let isCompleted = false;

  /**
   * Handles completion or error events, ensuring the callback is only called once.
   * @param {any} event - The event or error to pass to the callback.
   */
  const handleCompletionOrError = (event) => {
    if (!isCompleted) {
      isCompleted = true;
      if (onCompleteOrError) {
        onCompleteOrError(event);
      }
    }
  };

  return new ReadableStream(
    {
      /**
       * Called when the consumer requests more data from the stream.
       * @param {ReadableStreamDefaultController} controller
       */
      async pull(controller) {
        try {
          // Get the next chunk from the source iterator
          const { done, value } = await sourceIterator.next();

          if (done) {
            // If the iterator is done, signal completion and close the stream
            handleCompletionOrError();
            controller.close();
            return;
          }

          // Track the number of bytes streamed
          const chunkByteLength = value.byteLength;
          if (onProgress) {
            totalBytesStreamed += chunkByteLength;
            onProgress(totalBytesStreamed);
          }

          // Enqueue the chunk as a Uint8Array
          controller.enqueue(new Uint8Array(value));
        } catch (error) {
          // On error, signal completion and rethrow
          handleCompletionOrError(error);
          throw error;
        }
      },

      /**
       * Called when the consumer cancels the stream.
       * @param {any} reason - The reason for cancellation.
       * @returns {Promise<any>} a promise that resolves when the source iterator is closed.
       */
      cancel(reason) {
        handleCompletionOrError(reason);
        return sourceIterator.return();
      }
    },
    {
      highWaterMark: 2 // Set the internal buffer size for the stream
    }
  );
}

module.exports = createObservableReadableStream;
