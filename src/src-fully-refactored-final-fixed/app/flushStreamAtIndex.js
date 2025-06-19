/**
 * Flushes or clears a stream or buffer at a specified index within the provided streams array.
 *
 * If index is 0, clears the first stream/buffer and returns its previous value.
 * If index is 1 or 2, calls the flush() method on the stream/buffer at that index and returns the result.
 * Throws an error for any other index value.
 *
 * @param {Array} streams - An array of stream or buffer objects to operate on.
 * @param {number} index - The index of the stream/buffer to flush or clear (0, 1, or 2).
 * @returns {any} The previous value at index 0, or the result of flush() for index 1 or 2.
 * @throws {Error} If an invalid index is provided.
 */
function flushStreamAtIndex(streams, index) {
  switch (index) {
    case 0: {
      // Save the current value at index 0, clear isBlobOrFileLikeObject, and return the previous value
      const previousValue = streams[0];
      streams[0] = "";
      return previousValue;
    }
    case 1:
    case 2:
      // Call flush() on the stream/buffer at the given index and return its result
      return streams[index].flush();
    default:
      // Invalid index provided
      throw new Error(`@smithy/util-stream - invalid index ${index} given to flush()`);
  }
}

module.exports = flushStreamAtIndex;