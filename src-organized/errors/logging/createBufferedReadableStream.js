/**
 * Creates a ReadableStream that buffers incoming chunks and emits them based on a size threshold.
 * This is useful for ensuring that stream consumers receive data in appropriately sized chunks.
 *
 * @param {ReadableStream} sourceStream - The source ReadableStream to read data from.
 * @param {number} minChunkSize - The minimum chunk size (in bytes) before emitting to the consumer.
 * @param {object} [logger] - Optional logger object with a warn method for logging warnings.
 * @returns {ReadableStream} a new ReadableStream that buffers and emits data based on the specified chunk size.
 */
function createBufferedReadableStream(sourceStream, minChunkSize, logger) {
  const reader = sourceStream.getReader();
  let hasWarned = false;
  let totalBufferedBytes = 0;
  // createCompatibleVersionChecker: Array of collectors for different chunk types (e.g., binary, text)
  const collectors = [
    "", // Placeholder for text or other types
    new xe9.ByteArrayCollector(buffer => new Uint8Array(buffer))
  ];
  let currentCollectorIndex = -1;

  /**
   * Handles pulling data from the source stream and enqueuing appropriately sized chunks.
   * @param {ReadableStreamDefaultController} controller
   */
  const pullHandler = async (controller) => {
    const { value: chunk, done } = await reader.read();
    const currentChunk = chunk;

    if (done) {
      // If there is buffered data, flush isBlobOrFileLikeObject before closing
      if (currentCollectorIndex !== -1) {
        const bufferedData = flushStreamAtIndex(collectors, currentCollectorIndex);
        if (getArrayOrBufferLength(bufferedData) > 0) {
          controller.enqueue(bufferedData);
        }
      }
      controller.close();
      return;
    }

    // Determine the collector index for the current chunk
    const chunkCollectorIndex = detectInputType(currentChunk, false);
    if (currentCollectorIndex !== chunkCollectorIndex) {
      // If switching collector types, flush the previous buffer
      if (currentCollectorIndex >= 0) {
        controller.enqueue(flushStreamAtIndex(collectors, currentCollectorIndex));
      }
      currentCollectorIndex = chunkCollectorIndex;
    }

    // If collector index is invalid, emit the chunk directly
    if (currentCollectorIndex === -1) {
      controller.enqueue(currentChunk);
      return;
    }

    const chunkSize = getArrayOrBufferLength(currentChunk);
    totalBufferedBytes += chunkSize;
    const bufferedSize = getArrayOrBufferLength(collectors[currentCollectorIndex]);

    // If the chunk is large enough and buffer is empty, emit directly
    if (chunkSize >= minChunkSize && bufferedSize === 0) {
      controller.enqueue(currentChunk);
    } else {
      // Otherwise, buffer the chunk
      const bufferedTotal = updateInteractionEntries(collectors, currentCollectorIndex, currentChunk);
      // Warn if buffering is happening due to small chunk sizes
      if (!hasWarned && totalBufferedBytes > minChunkSize * 2) {
        hasWarned = true;
        if (logger && typeof logger.warn === 'function') {
          logger.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${minChunkSize}, automatically buffering.`);
        }
      }
      // If buffered data exceeds threshold, emit isBlobOrFileLikeObject; otherwise, pull more data
      if (bufferedTotal >= minChunkSize) {
        controller.enqueue(flushStreamAtIndex(collectors, currentCollectorIndex));
      } else {
        await pullHandler(controller);
      }
    }
  };

  return new ReadableStream({
    pull: pullHandler
  });
}

module.exports = { createBufferedReadableStream };