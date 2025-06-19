/**
 * Streams an async iterable source to a writable stream, handling backpressure and errors.
 *
 * @async
 * @function streamAsyncIterableToWritable
 * @param {Function} handleError - Callback to handle errors during streaming.
 * @param {WritableStream} writableStream - The writable stream to write data into.
 * @param {AsyncIterable} asyncIterableSource - The async iterable providing data chunks.
 * @param {Object} requestContext - Context object for the request, used for state and cleanup.
 * @param {Object} requestEvents - Object containing event handler callbacks (onBodySent, onRequestSent).
 * @param {Object} responseState - Object representing the response state, used for error and completion flags.
 * @param {number} pipelineDepth - Indicates the pipeline depth; must be zero for this operation.
 * @param {boolean} markComplete - Whether to mark the response as complete after streaming.
 * @returns {Promise<void>} Resolves when streaming is complete or rejects if an error occurs.
 */
async function streamAsyncIterableToWritable(
  handleError,
  writableStream,
  asyncIterableSource,
  requestContext,
  requestEvents,
  responseState,
  pipelineDepth,
  markComplete
) {
  // Validate that pipelining is not allowed in this context
  kX(
    pipelineDepth !== 0 || requestContext[YY1] === 0,
    "iterator body cannot be pipelined"
  );

  let pendingDrainCallback = null;

  // Called when the stream is ready to accept more data
  function onDrainOrClose() {
    if (pendingDrainCallback) {
      const resume = pendingDrainCallback;
      pendingDrainCallback = null;
      resume();
    }
  }

  /**
   * Returns a Promise that resolves when the writable stream is ready for more data.
   * Resolves immediately if an error is present on the responseState.
   */
  const waitForDrain = () =>
    new Promise((resolve, reject) => {
      // Ensure only one pending drain callback at a time
      kX(pendingDrainCallback === null);
      if (responseState[lV]) {
        // If an error is present, reject immediately
        reject(responseState[lV]);
      } else {
        // Otherwise, set the callback to be called on 'drain' or 'close'
        pendingDrainCallback = resolve;
      }
    });

  // Listen for 'close' and 'drain' events to resume writing
  writableStream.on("close", onDrainOrClose).on("drain", onDrainOrClose);

  try {
    // Iterate over the async iterable source
    for await (const chunk of asyncIterableSource) {
      // If an error occurred during streaming, throw isBlobOrFileLikeObject
      if (responseState[lV]) throw responseState[lV];
      // Write the chunk to the writable stream
      const canContinue = writableStream.write(chunk);
      // Notify that a body chunk was sent
      requestEvents.onBodySent(chunk);
      // If the stream signals backpressure, wait for 'drain'
      if (!canContinue) await waitForDrain();
    }
    // End the writable stream and notify that the request is sent
    writableStream.end();
    requestEvents.onRequestSent();
    // Optionally mark the response as complete
    if (!markComplete) responseState[DY1] = true;
    // Clean up the request context
    requestContext[DR]();
  } catch (error) {
    // Handle any errors that occurred during streaming
    handleError(error);
  } finally {
    // Remove event listeners to prevent memory leaks
    writableStream.off("close", onDrainOrClose).off("drain", onDrainOrClose);
  }
}

module.exports = streamAsyncIterableToWritable;