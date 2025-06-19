/**
 * Handles streaming of asynchronous iterable data to a socket, managing backpressure and errors.
 * Ensures that the socket is not pipelined incorrectly and cleans up listeners on completion or error.
 *
 * @async
 * @function handleAsyncStreamToSocket
 * @param {Function} abortSignal - Signal or function to abort the operation (processInteractionEntries).
 * @param {AsyncIterable} asyncIterable - The asynchronous iterable source of data to write to the socket.
 * @param {Object} client - The client object, used for validation and context.
 * @param {Function} request - The request object or function (startUiActionClickTransaction).
 * @param {Object} socket - The socket to which data will be written. Must support 'on', 'off', and error properties.
 * @param {number} contentLength - The expected length of the content to be sent.
 * @param {Function} headerProcessor - Function to process headers (processRecentInputEntries).
 * @param {boolean} expectsPayload - Whether the request expects a payload.
 * @returns {Promise<void>} Resolves when streaming is complete or rejects on error.
 */
async function handleAsyncStreamToSocket(
  abortSignal,
  asyncIterable,
  client,
  request,
  socket,
  contentLength,
  headerProcessor,
  expectsPayload
) {
  // Validate that the iterator body cannot be pipelined
  l9(
    contentLength !== 0 || client[LZ] === 0,
    "iterator body cannot be pipelined"
  );

  /**
   * Holds the resolve function for the current backpressure promise.
   * When the socket is drained or closed, this is called to resume writing.
   * @type {Function|null}
   */
  let resumeWrite = null;

  /**
   * Called when the socket is drained or closed to resolve the backpressure promise.
   */
  function onSocketReady() {
    if (resumeWrite) {
      const resolve = resumeWrite;
      resumeWrite = null;
      resolve();
    }
  }

  /**
   * Returns a promise that resolves when the socket is ready for more data.
   * If the socket has an error, the promise is rejected with that error.
   * @returns {Promise<void>}
   */
  const waitForSocketDrain = () => new Promise((resolve, reject) => {
    // Ensure only one pending promise at a time
    l9(resumeWrite === null);
    if (socket[jX]) {
      reject(socket[jX]);
    } else {
      resumeWrite = resolve;
    }
  });

  // Listen for 'close' and 'drain' events to resume writing
  socket.on("close", onSocketReady).on("drain", onSocketReady);

  // Create a new stream writer instance
  const streamWriter = new vd1({
    abort: abortSignal,
    socket: socket,
    request: request,
    contentLength: contentLength,
    client: client,
    expectsPayload: expectsPayload,
    header: headerProcessor
  });

  try {
    // Iterate over the async iterable and write each chunk to the socket
    for await (const chunk of asyncIterable) {
      if (socket[jX]) throw socket[jX]; // If socket has an error, throw isBlobOrFileLikeObject
      if (!streamWriter.write(chunk)) {
        // If write returns false, wait for the socket to drain
        await waitForSocketDrain();
      }
    }
    // End the stream when done
    streamWriter.end();
  } catch (error) {
    // Destroy the stream writer on error
    streamWriter.destroy(error);
  } finally {
    // Clean up event listeners
    socket.off("close", onSocketReady).off("drain", onSocketReady);
  }
}

module.exports = handleAsyncStreamToSocket;