/**
 * Converts an async iterable (such as an async generator) into a ReadableStream of bytes.
 * Each item yielded by the async iterable is expected to be a Buffer or convertible to a Buffer.
 *
 * @param {AsyncIterable<Buffer|ArrayBuffer|Uint8Array|string>} asyncIterable - The async iterable source to stream from.
 * @returns {ReadableStream<Uint8Array>} a ReadableStream in 'bytes' mode that emits Uint8Array chunks.
 */
function asyncIterableToReadableByteStream(asyncIterable) {
  let asyncIterator;
  return new ReadableStream({
    /**
     * Called when the stream is constructed. Initializes the async iterator.
     * @this {ReadableStreamDefaultController}
     */
    async start() {
      asyncIterator = asyncIterable[Symbol.asyncIterator]();
    },

    /**
     * Called when the consumer requests more data. Pulls the next chunk from the async iterator.
     * @param {ReadableStreamDefaultController} controller
     * @returns {Promise<boolean>} True if more data can be enqueued, false otherwise.
     */
    async pull(controller) {
      // Get the next item from the async iterator
      const { done, value } = await asyncIterator.next();
      if (done) {
        // If the iterator is done, close the stream and respond to any BYOB request
        queueMicrotask(() => {
          controller.close();
          controller.byobRequest?.respond(0);
        });
      } else {
        // Ensure the chunk is a Buffer
        const bufferChunk = Buffer.isBuffer(value) ? value : Buffer.from(value);
        if (bufferChunk.byteLength) {
          // Enqueue the chunk as a Uint8Array
          controller.enqueue(new Uint8Array(bufferChunk));
        }
      }
      // Return whether the stream desires more data
      return controller.desiredSize > 0;
    },

    /**
     * Called if the consumer cancels the stream. Cleans up the async iterator.
     * @param {any} reason
     * @returns {Promise<void>}
     */
    async cancel(reason) {
      await asyncIterator.return();
    },

    type: "bytes"
  });
}

module.exports = asyncIterableToReadableByteStream;