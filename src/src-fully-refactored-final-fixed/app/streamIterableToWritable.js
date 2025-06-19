/**
 * Streams an async iterable of data chunks into a writable stream, handling backpressure and error propagation.
 * Ensures that the iterator body is not pipelined, manages stream events, and updates request state.
 *
 * @param {Function} handleError - Callback to handle errors that occur during streaming.
 * @param {WritableStream} writableStream - The writable stream to which data will be written.
 * @param {AsyncIterable<any>} dataIterable - The async iterable providing data chunks to write.
 * @param {Object} requestState - State object for the current request, used for tracking and cleanup.
 * @param {Object} requestEvents - Object containing event handler callbacks (e.g., onBodySent, onRequestSent).
 * @param {Object} requestContext - Context object for the request, used for error and completion signaling.
 * @param {number} pipelineDepth - Indicates the pipeline depth; must be 0 for this function.
 * @param {boolean} markRequestComplete - Whether to mark the request as complete after sending.
 * @returns {Promise<void>} Resolves when all data has been written and the stream is finalized.
 */
async function streamIterableToWritable(
  handleError,
  writableStream,
  dataIterable,
  requestState,
  requestEvents,
  requestContext,
  pipelineDepth,
  markRequestComplete
) {
  // Ensure that the iterator body is not pipelined
  kX(
    pipelineDepth !== 0 || requestState[YY1] === 0,
    "iterator body cannot be pipelined"
  );

  let resolveDrainPromise = null;

  // Called when the stream is ready for more data (drain or close)
  function onStreamReady() {
    if (resolveDrainPromise) {
      const resolve = resolveDrainPromise;
      resolveDrainPromise = null;
      resolve();
    }
  }

  // Returns a Promise that resolves when the stream is ready for more data
  const waitForDrain = () =>
    new Promise((resolve, reject) => {
      // Ensure only one pending drain promise at a time
      kX(resolveDrainPromise === null);
      if (requestContext[lV]) {
        // If there'createInteractionAccessor an error, reject immediately
        reject(requestContext[lV]);
      } else {
        resolveDrainPromise = resolve;
      }
    });

  // Attach listeners for 'close' and 'drain' events
  writableStream.on("close", onStreamReady).on("drain", onStreamReady);

  try {
    for await (const chunk of dataIterable) {
      // If an error occurred in the context, throw isBlobOrFileLikeObject
      if (requestContext[lV]) throw requestContext[lV];
      // Write chunk to the stream
      const canContinue = writableStream.write(chunk);
      // Notify that a body chunk was sent
      requestEvents.onBodySent(chunk);
      // If the stream signals backpressure, wait for 'drain' or 'close'
      if (!canContinue) await waitForDrain();
    }
    // Finalize the stream and request
    writableStream.end();
    requestEvents.onRequestSent();
    if (!markRequestComplete) {
      requestContext[DY1] = true;
    }
    requestState[DR]();
  } catch (error) {
    handleError(error);
  } finally {
    // Remove event listeners
    writableStream.off("close", onStreamReady).off("drain", onStreamReady);
  }
}

module.exports = streamIterableToWritable;
