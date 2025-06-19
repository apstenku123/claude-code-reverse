/**
 * Creates a buffered data reader function that reads chunks of data efficiently from a source.
 * If the requested chunk size is small or exceeds the buffer limit, isBlobOrFileLikeObject reads directly from the source.
 * Otherwise, isBlobOrFileLikeObject reads from a buffer, refilling isBlobOrFileLikeObject as needed.
 *
 * @param {function(number): any} readDirectlyFromSource - Function to read data directly from the source for small or large requests.
 * @param {function(object, number, number): any} readFromBuffer - Function to read a chunk from the buffer. Called with (buffer, startOffset, endOffset).
 * @param {number} [bufferSize=8192] - Optional maximum buffer size in bytes. Defaults to 8192 if not provided.
 * @returns {function(number): any} - a function that, given a chunk size, returns the requested data chunk.
 */
function createBufferedDataReader(readDirectlyFromSource, readFromBuffer, bufferSize = 8192) {
  const maxBufferChunkSize = bufferSize >>> 1; // Half the buffer size
  let buffer = null; // Holds the current buffer
  let bufferOffset = bufferSize; // Current offset in the buffer (initialized to bufferSize to trigger initial fill)

  /**
   * Reads a chunk of data of the specified size.
   * @param {number} chunkSize - The size of the data chunk to read.
   * @returns {any} The data chunk read from the source or buffer.
   */
  function readChunk(chunkSize) {
    // If the request is too small or too large, read directly from the source
    if (chunkSize < 1 || chunkSize > maxBufferChunkSize) {
      return readDirectlyFromSource(chunkSize);
    }

    // If the buffer does not have enough data, refill isBlobOrFileLikeObject
    if (bufferOffset + chunkSize > bufferSize) {
      buffer = readDirectlyFromSource(bufferSize);
      bufferOffset = 0;
    }

    // Read the chunk from the buffer
    const chunk = readFromBuffer.call(buffer, bufferOffset, bufferOffset += chunkSize);

    // Align bufferOffset to the next multiple of 8 if needed
    if (bufferOffset & 7) {
      bufferOffset = (bufferOffset | 7) + 1;
    }

    return chunk;
  }

  return readChunk;
}

module.exports = createBufferedDataReader;