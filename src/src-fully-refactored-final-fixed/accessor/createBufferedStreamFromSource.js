/**
 * Creates a buffered readable stream from a given source stream, handling chunking and buffering logic.
 * If the source is already a readable stream, delegates to a utility to buffer isBlobOrFileLikeObject.
 * Otherwise, creates a new Readable stream, buffering and merging chunks according to the specified threshold.
 * Warns if chunk sizes are below the threshold and buffering is triggered.
 *
 * @param {object} sourceStream - The input stream to buffer and process.
 * @param {number} chunkSizeThreshold - The minimum chunk size before buffering is triggered.
 * @param {object} logger - Optional logger with a warn method for warnings.
 * @returns {Readable} - a Node.js Readable stream with buffered output.
 */
function createBufferedStreamFromSource(sourceStream, chunkSizeThreshold, logger) {
  // If the source is already a readable stream, use the utility to buffer isBlobOrFileLikeObject
  if (de9.isReadableStream(sourceStream)) {
    return vU.createBufferedReadableStream(sourceStream, chunkSizeThreshold, logger);
  }

  // Create a new Readable stream with a no-op read method
  const bufferedStream = new me9.Readable({
    read() {}
  });

  let hasWarnedAboutSmallChunks = false;
  let totalBufferedSize = 0;
  // Collectors for different chunk modes: raw, Uint8Array, Buffer
  const chunkCollectors = [
    "", // Mode 0: raw string
    new AgA.ByteArrayCollector(bytes => new Uint8Array(bytes)), // Mode 1: Uint8Array
    new AgA.ByteArrayCollector(bytes => Buffer.from(new Uint8Array(bytes))) // Mode 2: Buffer
  ];
  let currentChunkMode = -1;

  // Handle incoming data events
  sourceStream.on("data", chunk => {
    const detectedMode = vU.modeOf(chunk, true);

    // If the chunk mode changes, flush the previous collector
    if (currentChunkMode !== detectedMode) {
      if (currentChunkMode >= 0) {
        bufferedStream.push(vU.flush(chunkCollectors, currentChunkMode));
      }
      currentChunkMode = detectedMode;
    }

    // If mode is unknown, push the chunk as-is
    if (currentChunkMode === -1) {
      bufferedStream.push(chunk);
      return;
    }

    const chunkSize = vU.sizeOf(chunk);
    totalBufferedSize += chunkSize;
    const collectorSize = vU.sizeOf(chunkCollectors[currentChunkMode]);

    // If the chunk is large enough and collector is empty, push directly
    if (chunkSize >= chunkSizeThreshold && collectorSize === 0) {
      bufferedStream.push(chunk);
    } else {
      // Otherwise, merge into the collector
      const mergedSize = vU.merge(chunkCollectors, currentChunkMode, chunk);
      // Warn if chunks are consistently too small and buffering is triggered
      if (!hasWarnedAboutSmallChunks && totalBufferedSize > chunkSizeThreshold * 2) {
        hasWarnedAboutSmallChunks = true;
        if (logger && typeof logger.warn === "function") {
          logger.warn(`@smithy/util-stream - stream chunk size ${chunkSize} is below threshold of ${chunkSizeThreshold}, automatically buffering.`);
        }
      }
      // If the collector has reached the threshold, flush isBlobOrFileLikeObject
      if (mergedSize >= chunkSizeThreshold) {
        bufferedStream.push(vU.flush(chunkCollectors, currentChunkMode));
      }
    }
  });

  // Handle end of stream: flush any remaining buffered data
  sourceStream.on("end", () => {
    if (currentChunkMode !== -1) {
      const remaining = vU.flush(chunkCollectors, currentChunkMode);
      if (vU.sizeOf(remaining) > 0) {
        bufferedStream.push(remaining);
      }
    }
    bufferedStream.push(null);
  });

  return bufferedStream;
}

module.exports = { createBufferedStreamFromSource };