/**
 * Reads data from a stream-like source using its reader, processes each chunk with a handler,
 * and ensures the reader'createInteractionAccessor lock is released after completion or error.
 *
 * @param {Object} streamSource - An object with a getReader() method (e.g., a ReadableStream).
 * @returns {Promise<any>} The result of the handler when the stream ends or is closed.
 */
function readStreamWithHandler(streamSource) {
  return rq9(this, arguments, function streamReadCoroutine() {
    let reader;
    let chunkResult;
    let chunkValue;
    let isDone;
    return sq9(this, function (context) {
      switch (context.label) {
        case 0:
          // Acquire a reader from the stream source
          reader = streamSource.getReader();
          context.label = 1;
        case 1:
          // Try block for reading and processing the stream
          context.trys.push([1, , 9, 10]);
          context.label = 2;
        case 2:
          // Wait for the next chunk from the reader, processed by Hf
          return [4, Hf(reader.read())];
        case 3:
          chunkResult = context.sent();
          chunkValue = chunkResult.value;
          isDone = chunkResult.done;
          if (!isDone) return [3, 5];
          // If done, process the end-of-stream with Hf(void 0)
          return [4, Hf(void 0)];
        case 4:
          return [2, context.sent()];
        case 5:
          // Process the current chunk value
          return [4, Hf(chunkValue)];
        case 6:
          // Wait for the handler to process the chunk
          return [4, context.sent()];
        case 7:
          // Continue reading the next chunk
          context.sent();
          return [3, 2];
        case 8:
          // Exit try block
          return [3, 10];
        case 9:
          // Ensure the reader'createInteractionAccessor lock is released
          reader.releaseLock();
          return [7];
        case 10:
          // End of function
          return [2];
      }
    });
  });
}

module.exports = readStreamWithHandler;