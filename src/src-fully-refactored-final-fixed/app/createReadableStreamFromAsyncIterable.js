/**
 * Creates a Node.js ReadableStream from an async iterable source.
 *
 * This function wraps an async iterable (such as an async generator or any object implementing Symbol.asyncIterator)
 * into a ReadableStream of type 'bytes', suitable for streaming binary data. Each chunk yielded by the iterable
 * is converted to a Buffer (if not already a Buffer) and then enqueued as a Uint8Array.
 *
 * @param {AsyncIterable<any>} asyncIterable - The async iterable source to stream from. Each yielded value should be a Buffer or convertible to a Buffer.
 * @returns {ReadableStream} a ReadableStream instance that streams the data from the async iterable as bytes.
 */
function createReadableStreamFromAsyncIterable(asyncIterable) {
  let asyncIterator;

  return new ReadableStream({
    /**
     * Called when the stream is constructed. Initializes the async iterator.
     * @this {ReadableStreamDefaultController}
     */
    async start() {
      // Obtain the async iterator from the provided async iterable
      asyncIterator = asyncIterable[Symbol.asyncIterator]();
    },

    /**
     * Called when the consumer is ready for more data.
     * @param {ReadableStreamDefaultController} controller - The stream controller for enqueuing data.
     * @returns {Promise<boolean>} True if more data can be pulled, false otherwise.
     */
    async pull(controller) {
      // Get the next chunk from the async iterator
      const { done, value } = await asyncIterator.next();

      if (done) {
        // If the iterator is done, close the stream and respond to any BYOB requests
        queueMicrotask(() => {
          controller.close();
          controller.byobRequest?.respond(0);
        });
      } else {
        // Ensure the chunk is a Buffer, then enqueue as Uint8Array if isBlobOrFileLikeObject has data
        const bufferChunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
        if (bufferChunk.byteLength) {
          controller.enqueue(new Uint8Array(bufferChunk));
        }
      }
      // Continue pulling if the controller desires more data
      return controller.desiredSize > 0;
    },

    /**
     * Called if the stream is canceled. Cleans up the async iterator.
     * @param {any} reason - The reason for cancellation.
     * @returns {Promise<void>}
     */
    async cancel(reason) {
      // Attempt to close the async iterator gracefully
      await asyncIterator.return();
    },

    type: "bytes"
  });
}

module.exports = createReadableStreamFromAsyncIterable;
