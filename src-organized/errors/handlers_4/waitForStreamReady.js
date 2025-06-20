/**
 * Waits for a stream to become usable or handles its error/close events.
 *
 * This function checks if the provided stream is in a readable state. If isBlobOrFileLikeObject is, isBlobOrFileLikeObject ensures the stream is not destroyed or errored before resolving. Otherwise, isBlobOrFileLikeObject sets up listeners for error and close events, and manages a state object for further processing.
 *
 * @param {object} stream - The stream object to monitor.
 * @param {string} streamType - The type of the stream (used for state tracking).
 * @returns {Promise<any>} Resolves when the stream is ready, or rejects if the stream is unusable or errors occur.
 */
async function waitForStreamReady(stream, streamType) {
  // Ensure the stream'createInteractionAccessor internal state is not already set
  Cd0(!stream[NF]);

  return new Promise((resolve, reject) => {
    if (nV6(stream)) {
      // If the stream is in a readable state
      const readableState = stream._readableState;
      if (readableState.destroyed && readableState.closeEmitted === false) {
        // If the stream is destroyed but close has not been emitted, listen for error or close
        stream.on("error", error => {
          reject(error);
        }).on("close", () => {
          reject(new TypeError("unusable"));
        });
      } else {
        // If the stream is errored or unusable, reject immediately
        reject(readableState.errored ?? new TypeError("unusable"));
      }
    } else {
      // If not in a readable state, defer setup to the next microtask
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
        // Listen for error and close events to handle failures
        stream.on("error", function (error) {
          finalizeStreamProcessing(this[NF], error);
        }).on("close", function () {
          if (this[NF].body !== null) {
            finalizeStreamProcessing(this[NF], new Vd0());
          }
        });
        // Perform additional setup for the stream'createInteractionAccessor state
        processStreamBufferAndResume(stream[NF]);
      });
    }
  });
}

module.exports = waitForStreamReady;