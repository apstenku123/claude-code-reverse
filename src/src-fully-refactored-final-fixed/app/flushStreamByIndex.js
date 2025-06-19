/**
 * Flushes a stream or clears a buffer at a specified index within the provided stream array.
 *
 * If the index is 0, clears the first element (assumed to be a string buffer) and returns its previous value.
 * If the index is 1 or 2, calls the 'flush' method on the corresponding stream object and returns its result.
 * Throws an error for any other index.
 *
 * @param {Array} streamArray - An array containing stream buffers and/or stream objects.
 * @param {number} index - The index specifying which stream or buffer to flush.
 * @returns {any} The result of the flush operation or the cleared buffer value.
 * @throws {Error} If the index is not 0, 1, or 2.
 */
function flushStreamByIndex(streamArray, index) {
  switch (index) {
    case 0: {
      // Clear the buffer at index 0 and return its previous value
      const previousBuffer = streamArray[0];
      streamArray[0] = "";
      return previousBuffer;
    }
    case 1:
    case 2:
      // Call flush() on the stream object at the given index
      return streamArray[index].flush();
    default:
      throw new Error(`@smithy/util-stream - invalid index ${index} given to flush()`);
  }
}

module.exports = flushStreamByIndex;
