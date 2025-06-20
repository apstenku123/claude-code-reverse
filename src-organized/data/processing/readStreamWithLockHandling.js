/**
 * Reads values from a stream-like source using its reader, handling lock acquisition and release.
 * Each value is processed with the provided async handler (Hf), and the lock is always released.
 *
 * @param {Object} streamSource - An object with a getReader() method (e.g., a ReadableStream).
 * @returns {Promise<any>} The result of the last handler call or undefined if the stream is done.
 */
function readStreamWithLockHandling(streamSource) {
  return rq9(this, arguments, function streamReadGenerator() {
    let reader;
    let readResult;
    let value;
    let done;
    return sq9(this, function (context) {
      switch (context.label) {
        case 0:
          // Acquire a reader from the stream source
          reader = streamSource.getReader();
          context.label = 1;
        case 1:
          // Try block for reading and processing values
          context.trys.push([1, , 9, 10]);
          context.label = 2;
        case 2:
          // Await the result of reading from the stream
          return [4, Hf(reader.read())];
        case 3:
          // Destructure the read result
          readResult = context.sent();
          value = readResult.value;
          done = readResult.done;
          // If not done, process the value and loop
          if (!done) return [3, 5];
          // If done, process with undefined and return
          return [4, Hf(void 0)];
        case 4:
          return [2, context.sent()];
        case 5:
          // Process the value
          return [4, Hf(value)];
        case 6:
          // Await the result of processing
          return [4, context.sent()];
        case 7:
          // Loop back to read the next value
          context.sent();
          return [3, 2];
        case 8:
          // Exit try block
          return [3, 10];
        case 9:
          // Always release the reader lock
          reader.releaseLock();
          return [7];
        case 10:
          // End of generator
          return [2];
      }
    });
  });
}

module.exports = readStreamWithLockHandling;