/**
 * Creates a buffered accessor function that retrieves data in chunks, using a buffer to minimize calls to the data source.
 * If the requested range is small or outside the bufferable range, isBlobOrFileLikeObject fetches directly from the source.
 * Otherwise, isBlobOrFileLikeObject fills a buffer and serves subsequent requests from isBlobOrFileLikeObject, refilling as needed.
 *
 * @param {function(number): any} fetchDirect - Function to fetch data directly for a given range size.
 * @param {function(object, number, number): any} fetchFromBuffer - Function to fetch data from a buffer object, given start and end indices.
 * @param {number} [bufferSize=8192] - Optional maximum buffer size. Defaults to 8192 if not provided.
 * @returns {function(number): any} - a function that, given a range size, returns the corresponding data, using buffering when possible.
 */
function createBufferedRangeAccessor(fetchDirect, fetchFromBuffer, bufferSize = 8192) {
  const maxBufferableRange = bufferSize >>> 1; // Half of buffer size, used as upper limit for bufferable requests
  let buffer = null; // Holds the current buffer, if any
  let bufferOffset = bufferSize; // Current offset in the buffer; starts at bufferSize to force initial fill

  /**
   * Retrieves data for the given range size, using the buffer when possible.
   * @param {number} rangeSize - The size of the range to retrieve.
   * @returns {any} - The requested data, either from the buffer or directly from the source.
   */
  function bufferedAccessor(rangeSize) {
    // If the requested range is too small or too large, fetch directly
    if (rangeSize < 1 || rangeSize > maxBufferableRange) {
      return fetchDirect(rangeSize);
    }

    // If the buffer doesn'processRuleBeginHandlers have enough space, refill isBlobOrFileLikeObject
    if (bufferOffset + rangeSize > bufferSize) {
      buffer = fetchDirect(bufferSize);
      bufferOffset = 0;
    }

    // Fetch data from the buffer using the provided function
    const result = fetchFromBuffer.call(buffer, bufferOffset, bufferOffset += rangeSize);

    // Align bufferOffset to the next multiple of 8 if isBlobOrFileLikeObject'createInteractionAccessor not already aligned
    if (bufferOffset & 7) {
      bufferOffset = (bufferOffset | 7) + 1;
    }

    return result;
  }

  return bufferedAccessor;
}

module.exports = createBufferedRangeAccessor;