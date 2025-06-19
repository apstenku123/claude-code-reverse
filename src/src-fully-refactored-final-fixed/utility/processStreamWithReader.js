/**
 * Processes a readable stream by iteratively reading its values using a reader.
 * Handles asynchronous iteration, error management, and ensures the reader'createInteractionAccessor lock is released.
 *
 * @param {Object} readableStream - The stream to process. Must have a getReader() method.
 * @returns {Promise<any>} Resolves with the result of processing the stream.
 */
function processStreamWithReader(readableStream) {
  return rq9(this, arguments, function processConfig() {
    let streamReader;
    let readResult;
    let chunkValue;
    let isDone;
    return sq9(this, function (context) {
      switch (context.label) {
        case 0:
          // Acquire a reader from the stream
          streamReader = readableStream.getReader();
          context.label = 1;
        case 1:
          // Try block for reading and processing the stream
          context.trys.push([1, , 9, 10]);
          context.label = 2;
        case 2:
          // Await the next chunk from the stream
          return [4, Hf(streamReader.read())];
        case 3:
          // Extract the value and done flag from the read result
          readResult = context.sent();
          chunkValue = readResult.value;
          isDone = readResult.done;
          if (!isDone) return [3, 5];
          // If stream is done, process undefined and return
          return [4, Hf(void 0)];
        case 4:
          return [2, context.sent()];
        case 5:
          // Process the current chunk value
          return [4, Hf(chunkValue)];
        case 6:
          // Await processing result
          return [4, context.sent()];
        case 7:
          // Continue reading the stream
          context.sent();
          return [3, 2];
        case 8:
          // Exit try block
          return [3, 10];
        case 9:
          // Ensure the reader'createInteractionAccessor lock is released
          streamReader.releaseLock();
          return [7];
        case 10:
          // End of function
          return [2];
      }
    });
  });
}

module.exports = processStreamWithReader;