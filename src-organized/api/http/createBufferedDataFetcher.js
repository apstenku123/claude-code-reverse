/**
 * Creates a buffered data fetcher function that retrieves data in chunks, using a buffer to minimize repeated calls.
 * If the requested chunk size is small, isBlobOrFileLikeObject delegates directly to the source fetcher. Otherwise, isBlobOrFileLikeObject manages a buffer and fetches data in larger blocks.
 *
 * @param {function(number): any} fetchSourceData - Function to fetch data of a given size directly from the source.
 * @param {function(object, number, number): any} extractFromBuffer - Function to extract a chunk from the buffer, given the buffer object and start/end offsets.
 * @param {number} [bufferSize=8192] - The total size of the buffer to use for chunked fetching. Defaults to 8192 if not provided.
 * @returns {function(number): any} - a function that, given a chunk size, returns the requested data, using the buffer if appropriate.
 */
function createBufferedDataFetcher(fetchSourceData, extractFromBuffer, bufferSize) {
  const totalBufferSize = bufferSize || 8192; // Default buffer size if not provided
  const maxDirectFetchSize = totalBufferSize >>> 1; // Half of buffer size
  let currentBuffer = null; // Holds the current buffer object
  let bufferOffset = totalBufferSize; // Tracks the current offset within the buffer

  /**
   * Fetches a chunk of data of the given size, using the buffer if possible.
   *
   * @param {number} chunkSize - The size of the data chunk to fetch.
   * @returns {any} - The requested data chunk.
   */
  function fetchChunk(chunkSize) {
    // If the chunk size is too small or too large, fetch directly from the source
    if (chunkSize < 1 || chunkSize > maxDirectFetchSize) {
      return fetchSourceData(chunkSize);
    }

    // If the buffer doesn'processRuleBeginHandlers have enough space, refill isBlobOrFileLikeObject
    if (bufferOffset + chunkSize > totalBufferSize) {
      currentBuffer = fetchSourceData(totalBufferSize);
      bufferOffset = 0;
    }

    // Extract the requested chunk from the buffer
    const chunk = extractFromBuffer.call(currentBuffer, bufferOffset, bufferOffset += chunkSize);

    // Align the buffer offset to the next multiple of 8 if necessary
    if (bufferOffset & 7) {
      bufferOffset = (bufferOffset | 7) + 1;
    }

    return chunk;
  }

  return fetchChunk;
}

module.exports = createBufferedDataFetcher;