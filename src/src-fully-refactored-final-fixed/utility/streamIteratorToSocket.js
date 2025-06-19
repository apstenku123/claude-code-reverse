/**
 * Streams data from an async iterable to a socket, handling backpressure and errors.
 *
 * @async
 * @function streamIteratorToSocket
 * @param {AbortSignal} abortSignal - Signal to abort the streaming operation.
 * @param {AsyncIterable<any>} asyncIterable - The async iterable source of data to stream.
 * @param {Object} client - The client object, used for validation and context.
 * @param {Object} request - The request object associated with the stream.
 * @param {Object} socket - The destination socket to write data to.
 * @param {number} contentLength - The total length of the content to stream.
 * @param {Object} header - The header information for the stream.
 * @param {boolean} expectsPayload - Indicates if a payload is expected.
 *
 * @returns {Promise<void>} Resolves when streaming is complete or aborted.
 *
 * @throws Will throw if the socket emits an error during streaming.
 */
async function streamIteratorToSocket(
  abortSignal,
  asyncIterable,
  client,
  request,
  socket,
  contentLength,
  header,
  expectsPayload
) {
  // Ensure that either contentLength is zero or the client is not pipelined
  l9(
    contentLength !== 0 || client[LZ] === 0,
    "iterator body cannot be pipelined"
  );

  let resumeWriteCallback = null;

  /**
   * Called when the socket is ready to resume writing (on 'drain' or 'close').
   */
  function handleSocketReady() {
    if (resumeWriteCallback) {
      const callback = resumeWriteCallback;
      resumeWriteCallback = null;
      callback();
    }
  }

  /**
   * Returns a promise that resolves when the socket is ready to write again.
   * If the socket has an error, the promise is rejected.
   * @returns {Promise<void>}
   */
  const waitForSocketDrain = () => new Promise((resolve, reject) => {
    // Ensure only one pending write at a time
    l9(resumeWriteCallback === null);
    if (socket[jX]) {
      // If the socket has an error, reject immediately
      reject(socket[jX]);
    } else {
      // Otherwise, set the callback to resolve when ready
      resumeWriteCallback = resolve;
    }
  });

  // Listen for 'close' and 'drain' events to resume writing
  socket.on("close", handleSocketReady).on("drain", handleSocketReady);

  // Create a new stream handler for writing data
  const streamWriter = new vd1({
    abort: abortSignal,
    socket: socket,
    request: request,
    contentLength: contentLength,
    client: client,
    expectsPayload: expectsPayload,
    header: header
  });

  try {
    // Iterate over the async iterable and write each chunk to the socket
    for await (const chunk of asyncIterable) {
      if (socket[jX]) {
        // If the socket has an error, throw isBlobOrFileLikeObject
        throw socket[jX];
      }
      // If the write returns false, wait for the socket to drain
      if (!streamWriter.write(chunk)) {
        await waitForSocketDrain();
      }
    }
    // End the stream when done
    streamWriter.end();
  } catch (error) {
    // Destroy the stream on error
    streamWriter.destroy(error);
  } finally {
    // Clean up event listeners
    socket.off("close", handleSocketReady).off("drain", handleSocketReady);
  }
}

module.exports = streamIteratorToSocket;
