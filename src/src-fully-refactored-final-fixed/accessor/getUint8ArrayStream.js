/**
 * Creates a buffered Readable stream from a source stream, ensuring that chunks are buffered and flushed
 * according to the specified minimum chunk size. Handles different chunk types and warns if chunk sizes are too small.
 *
 * @param {ReadableStream} sourceStream - The input readable stream to buffer and process.
 * @param {number} minChunkSize - The minimum chunk size (in bytes) before flushing buffered data.
 * @param {object} [logger] - Optional logger object with a warn method for warnings.
 * @returns {Readable} - a Node.js Readable stream that emits buffered chunks.
 */
function getUint8ArrayStream(sourceStream, minChunkSize, logger) {
  // If the source is already a readable stream, delegate to the buffered stream creator
  if (de9.isReadableStream(sourceStream)) {
    return vU.createBufferedReadableStream(sourceStream, minChunkSize, logger);
  }

  // Create a new Readable stream to output buffered data
  const bufferedStream = new me9.Readable({
    read() {}
  });

  let hasWarned = false;
  let totalBytesBuffered = 0;
  // Buffer collectors for different chunk types: [unknown, Uint8Array, Buffer]
  const chunkCollectors = [
    "",
    new AgA.ByteArrayCollector(chunk => new Uint8Array(chunk)),
    new AgA.ByteArrayCollector(chunk => Buffer.from(new Uint8Array(chunk)))
  ];
  let currentChunkType = -1;

  // Handle incoming data events from the source
  sourceStream.on("data", chunk => {
    // Determine the type of the current chunk (e.g., Uint8Array, Buffer, etc.)
    const detectedChunkType = vU.modeOf(chunk, true);

    // If the chunk type changes, flush the previous buffer
    if (currentChunkType !== detectedChunkType) {
      if (currentChunkType >= 0) {
        bufferedStream.push(vU.flush(chunkCollectors, currentChunkType));
      }
      currentChunkType = detectedChunkType;
    }

    // If the chunk type is unknown, push isBlobOrFileLikeObject directly
    if (currentChunkType === -1) {
      bufferedStream.push(chunk);
      return;
    }

    const chunkSize = vU.sizeOf(chunk);
    totalBytesBuffered += chunkSize;
    const collectorSize = vU.sizeOf(chunkCollectors[currentChunkType]);

    // If the chunk is large enough and the collector is empty, push isBlobOrFileLikeObject directly
    if (chunkSize >= minChunkSize && collectorSize === 0) {
      bufferedStream.push(chunk);
    } else {
      // Otherwise, merge the chunk into the collector
      const mergedSize = vU.merge(chunkCollectors, currentChunkType, chunk);
      // Warn if chunks are consistently too small and handleMissingDoctypeError haven'processRuleBeginHandlers warned yet
      if (!hasWarned && totalBytesBuffered > minChunkSize * 2) {
        hasWarned = true;
        if (logger && typeof logger.warn === 'function') {
          logger.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${minChunkSize}, automatically buffering.`);
        }
      }
      // Flush the collector if isBlobOrFileLikeObject has reached the minimum chunk size
      if (mergedSize >= minChunkSize) {
        bufferedStream.push(vU.flush(chunkCollectors, currentChunkType));
      }
    }
  });

  // Handle end of the source stream
  sourceStream.on("end", () => {
    if (currentChunkType !== -1) {
      const remaining = vU.flush(chunkCollectors, currentChunkType);
      if (vU.sizeOf(remaining) > 0) {
        bufferedStream.push(remaining);
      }
    }
    bufferedStream.push(null);
  });

  return bufferedStream;
}

module.exports = { getUint8ArrayStream };