/**
 * Waits for a readable stream to become usable, or rejects if isBlobOrFileLikeObject is destroyed or errors.
 * Handles both stream and non-stream objects, and sets up appropriate listeners and state.
 *
 * @param {object} stream - The stream-like object to monitor for usability.
 * @param {string} streamType - a string describing the type of stream operation.
 * @returns {Promise<any>} Resolves when the stream is usable, or rejects if unusable.
 */
async function waitForUsableStream(stream, streamType) {
  // Mark the stream as not finished (implementation-specific flag)
  Cd0(!stream[NF]);

  return new Promise((resolve, reject) => {
    // If the stream is a readable stream
    if (nV6(stream)) {
      const readableState = stream._readableState;
      // If the stream is destroyed but 'close' has not been emitted yet
      if (readableState.destroyed && readableState.closeEmitted === false) {
        // Listen for 'error' or 'close' events to reject the promise
        stream
          .on("error", error => {
            reject(error);
          })
          .on("close", () => {
            reject(new TypeError("unusable"));
          });
      } else {
        // If already errored or destroyed, reject immediately
        reject(readableState.errored ?? new TypeError("unusable"));
      }
    } else {
      // For non-stream objects, defer setup to the next microtask
      queueMicrotask(() => {
        // Attach a state object to the stream for tracking
        stream[NF] = {
          type: streamType,
          stream: stream,
          resolve: resolve,
          reject: reject,
          length: 0,
          body: []
        };
        // Listen for errors and close events to handle unusable state
        stream
          .on("error", function (error) {
            finalizeStreamProcessing(this[NF], error);
          })
          .on("close", function () {
            if (this[NF].body !== null) {
              finalizeStreamProcessing(this[NF], new Vd0());
            }
          });
        // Begin processing the stream state
        processStreamBufferAndResume(stream[NF]);
      });
    }
  });
}

module.exports = waitForUsableStream;