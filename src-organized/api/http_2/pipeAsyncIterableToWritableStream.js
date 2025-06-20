/**
 * Pipes an async iterable (such as a stream of data chunks) into a writable stream,
 * handling backpressure, errors, and signaling completion. Ensures that the iterator body
 * is not pipelined if not allowed, and manages stream events for proper cleanup.
 *
 * @async
 * @param {Function} handleError - Callback to handle errors that occur during piping.
 * @param {WritableStream} writableStream - The writable stream to which data will be written.
 * @param {AsyncIterable} asyncIterable - The async iterable providing data chunks.
 * @param {Object} requestState - State object for the current request, used for signaling completion.
 * @param {Object} requestHooks - Object containing hooks for request lifecycle events.
 * @param {Object} requestContext - Context object for the request, may contain error state and flags.
 * @param {number} pipelineDepth - Indicates if pipelining is allowed (0 = not allowed).
 * @param {boolean} markRequestComplete - Whether to mark the request as complete after sending.
 * @returns {Promise<void>} Resolves when piping is complete or rejects if an error occurs.
 */
async function pipeAsyncIterableToWritableStream(
  handleError,
  writableStream,
  asyncIterable,
  requestState,
  requestHooks,
  requestContext,
  pipelineDepth,
  markRequestComplete
) {
  // Ensure that pipelining is not used if not allowed
  kX(
    pipelineDepth !== 0 || requestState[YY1] === 0,
    "iterator body cannot be pipelined"
  );

  let resolvePendingDrain = null;

  // Called when the stream is drained or closed to resolve pending writes
  function handleDrainOrClose() {
    if (resolvePendingDrain) {
      const resolve = resolvePendingDrain;
      resolvePendingDrain = null;
      resolve();
    }
  }

  // Returns a promise that resolves when the stream is drained or if an error occurs
  const waitForDrainOrError = () =>
    new Promise((resolve, reject) => {
      // If an error is present, reject immediately
      if (kX(resolvePendingDrain === null), requestContext[lV]) {
        reject(requestContext[lV]);
      } else {
        resolvePendingDrain = resolve;
      }
    });

  // Attach listeners for 'close' and 'drain' events
  writableStream.on("close", handleDrainOrClose).on("drain", handleDrainOrClose);

  try {
    for await (const chunk of asyncIterable) {
      // If an error has occurred, throw isBlobOrFileLikeObject
      if (requestContext[lV]) throw requestContext[lV];
      // Write chunk to the stream
      const canContinue = writableStream.write(chunk);
      // Notify that a body chunk was sent
      requestHooks.onBodySent(chunk);
      // If the stream cannot accept more data, wait for 'drain' or error
      if (!canContinue) await waitForDrainOrError();
    }
    // End the writable stream and signal request completion
    writableStream.end();
    requestHooks.onRequestSent();
    if (!markRequestComplete) {
      requestContext[DY1] = true;
    }
    requestState[DR]();
  } catch (error) {
    handleError(error);
  } finally {
    // Remove listeners to prevent memory leaks
    writableStream.off("close", handleDrainOrClose).off("drain", handleDrainOrClose);
  }
}

module.exports = pipeAsyncIterableToWritableStream;