/**
 * Streams data from an async iterable source to a writable stream, handling backpressure and errors.
 * Ensures that the writable stream is properly drained before writing more data, and manages cleanup on completion or error.
 *
 * @param {Function} handleError - Callback to handle errors that occur during streaming.
 * @param {Writable} writableStream - The writable stream to which data will be written.
 * @param {AsyncIterable} asyncIterableSource - The async iterable source providing data chunks.
 * @param {Object} iteratorState - Object representing the state of the iterator, used for control and cleanup.
 * @param {Object} requestCallbacks - Object containing callback functions for request lifecycle events (onBodySent, onRequestSent).
 * @param {Object} streamState - Object representing the state of the stream, including error and completion flags.
 * @param {number} pipelineDepth - Indicates the pipeline depth; used to enforce single pipeline execution.
 * @param {boolean} markRequestComplete - Whether to mark the request as complete after streaming.
 * @returns {Promise<void>} Resolves when streaming is complete or rejects if an error occurs.
 */
async function streamAsyncIterableToWritable(
  handleError,
  writableStream,
  asyncIterableSource,
  iteratorState,
  requestCallbacks,
  streamState,
  pipelineDepth,
  markRequestComplete
) {
  // Ensure that the iterator body is not pipelined
  kX(pipelineDepth !== 0 || iteratorState[YY1] === 0, "iterator body cannot be pipelined");

  let pendingDrainCallback = null;

  // Called when the stream is drained or closed; resolves the pending write promise
  function resolvePendingDrain() {
    if (pendingDrainCallback) {
      const callback = pendingDrainCallback;
      pendingDrainCallback = null;
      callback();
    }
  }

  // Returns a promise that resolves when the stream is drained or an error occurs
  const waitForDrain = () => new Promise((resolve, reject) => {
    // Ensure only one pending drain callback at a time
    kX(pendingDrainCallback === null);
    if (streamState[lV]) {
      // If an error is present, reject immediately
      reject(streamState[lV]);
    } else {
      // Otherwise, set the callback to resolve when drained
      pendingDrainCallback = resolve;
    }
  });

  // Attach listeners for 'close' and 'drain' events to resolve pending writes
  writableStream.on("close", resolvePendingDrain).on("drain", resolvePendingDrain);

  try {
    // Iterate over the async iterable source
    for await (const chunk of asyncIterableSource) {
      // If an error occurred in the stream, throw isBlobOrFileLikeObject
      if (streamState[lV]) throw streamState[lV];
      // Write the chunk to the writable stream
      const canContinue = writableStream.write(chunk);
      // Notify that a body chunk was sent
      requestCallbacks.onBodySent(chunk);
      // If the stream cannot accept more data, wait for drain
      if (!canContinue) await waitForDrain();
    }
    // End the writable stream and notify that the request was sent
    writableStream.end();
    requestCallbacks.onRequestSent();
    // Optionally mark the request as complete
    if (!markRequestComplete) streamState[DY1] = true;
    // Perform iterator cleanup
    iteratorState[DR]();
  } catch (error) {
    // Handle any errors that occurred during streaming
    handleError(error);
  } finally {
    // Remove event listeners to prevent memory leaks
    writableStream.off("close", resolvePendingDrain).off("drain", resolvePendingDrain);
  }
}

module.exports = streamAsyncIterableToWritable;