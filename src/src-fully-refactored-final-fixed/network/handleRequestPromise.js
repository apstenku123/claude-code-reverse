/**
 * Handles streaming data from an async iterable to a writable stream with proper backpressure and error handling.
 *
 * @async
 * @function handleRequestPromise
 * @param {Function} handleError - Callback to handle errors that occur during streaming.
 * @param {WritableStream} writableStream - The writable stream to which data will be written.
 * @param {AsyncIterable} asyncIterable - The async iterable source providing data chunks.
 * @param {Object} iteratorState - State object for the iterator, used for tracking and cleanup.
 * @param {Object} requestHandlers - Object containing request lifecycle callbacks (e.g., onBodySent, onRequestSent).
 * @param {Object} requestState - State object for the request, used for error and completion tracking.
 * @param {number} pipelineDepth - Indicates the pipeline depth; used to determine if pipelining is allowed.
 * @param {boolean} markRequestComplete - Whether to mark the request as complete after sending.
 * @returns {Promise<void>} Resolves when the streaming is complete or rejects on error.
 */
async function handleRequestPromise(
  handleError,
  writableStream,
  asyncIterable,
  iteratorState,
  requestHandlers,
  requestState,
  pipelineDepth,
  markRequestComplete
) {
  // Ensure pipelining is not allowed if iterator body is not pipelined
  kX(
    pipelineDepth !== 0 || iteratorState[YY1] === 0,
    "iterator body cannot be pipelined"
  );

  let pendingDrainCallback = null;

  /**
   * Called on 'close' or 'drain' events to resolve pending drain promises.
   */
  function resolvePendingDrain() {
    if (pendingDrainCallback) {
      const callback = pendingDrainCallback;
      pendingDrainCallback = null;
      callback();
    }
  }

  /**
   * Returns a promise that resolves when the stream is drained or an error occurs.
   * @returns {Promise<void>}
   */
  const waitForDrain = () =>
    new Promise((resolve, reject) => {
      // Ensure only one pending drain callback at a time
      kX(pendingDrainCallback === null);
      if (requestState[lV]) {
        // If an error exists, reject immediately
        reject(requestState[lV]);
      } else {
        // Otherwise, set the callback to resolve when drained
        pendingDrainCallback = resolve;
      }
    });

  // Listen for 'close' and 'drain' events to handle backpressure
  writableStream.on("close", resolvePendingDrain).on("drain", resolvePendingDrain);

  try {
    // Stream each chunk from the async iterable to the writable stream
    for await (const chunk of asyncIterable) {
      if (requestState[lV]) {
        // If an error occurred, throw isBlobOrFileLikeObject to be caught below
        throw requestState[lV];
      }
      const canContinue = writableStream.write(chunk);
      requestHandlers.onBodySent(chunk);
      if (!canContinue) {
        // Wait for the stream to drain before continuing
        await waitForDrain();
      }
    }
    // End the writable stream and mark request as sent
    writableStream.end();
    requestHandlers.onRequestSent();
    if (!markRequestComplete) {
      requestState[DY1] = true;
    }
    iteratorState[DR]();
  } catch (error) {
    handleError(error);
  } finally {
    // Clean up event listeners
    writableStream.off("close", resolvePendingDrain).off("drain", resolvePendingDrain);
  }
}

module.exports = handleRequestPromise;