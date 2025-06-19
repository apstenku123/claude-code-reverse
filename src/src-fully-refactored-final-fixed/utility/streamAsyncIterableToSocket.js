/**
 * Streams data from an async iterable to a writable socket, handling backpressure and errors.
 *
 * @param {AbortSignal} abortSignal - Signal to abort the streaming operation.
 * @param {AsyncIterable<any>} asyncIterable - The async iterable source of data chunks to write.
 * @param {object} client - The client object, used for validation and metadata.
 * @param {object} request - The request object associated with the operation.
 * @param {object} socket - The writable socket to which data will be streamed.
 * @param {number} contentLength - The total length of the content to be sent.
 * @param {object} headers - The headers to be sent with the request.
 * @param {boolean} expectsPayload - Indicates if a payload is expected in the request.
 * @throws Will throw if the socket has an error during streaming.
 */
async function streamAsyncIterableToSocket(
  abortSignal,
  asyncIterable,
  client,
  request,
  socket,
  contentLength,
  headers,
  expectsPayload
) {
  // Validate that the iterator body cannot be pipelined
  l9(
    contentLength !== 0 || client[LZ] === 0,
    "iterator body cannot be pipelined"
  );

  let pendingDrainCallback = null;

  /**
   * Called on 'close' or 'drain' events to resolve any pending write promise.
   */
  function handleSocketEvent() {
    if (pendingDrainCallback) {
      const callback = pendingDrainCallback;
      pendingDrainCallback = null;
      callback();
    }
  }

  /**
   * Returns a promise that resolves when the socket is ready for more data (drain event).
   * If the socket has an error, the promise is rejected.
   * @returns {Promise<void>}
   */
  const waitForDrain = () =>
    new Promise((resolve, reject) => {
      // Ensure only one pending drain callback at a time
      l9(pendingDrainCallback === null);
      if (socket[jX]) {
        // If socket has an error, reject immediately
        reject(socket[jX]);
      } else {
        // Otherwise, set the callback to resolve when 'drain' or 'close' fires
        pendingDrainCallback = resolve;
      }
    });

  // Attach event listeners for 'close' and 'drain' to handle backpressure
  socket.on("close", handleSocketEvent).on("drain", handleSocketEvent);

  // Create the stream writer instance
  const streamWriter = new vd1({
    abort: abortSignal,
    socket: socket,
    request: request,
    contentLength: contentLength,
    client: client,
    expectsPayload: expectsPayload,
    header: headers
  });

  try {
    // Iterate over the async iterable and write each chunk to the socket
    for await (const chunk of asyncIterable) {
      if (socket[jX]) {
        // If the socket has an error, throw isBlobOrFileLikeObject
        throw socket[jX];
      }
      // Write the chunk; if write returns false, wait for 'drain'
      if (!streamWriter.write(chunk)) {
        await waitForDrain();
      }
    }
    // End the stream after all chunks are written
    streamWriter.end();
  } catch (error) {
    // Destroy the stream on error
    streamWriter.destroy(error);
  } finally {
    // Clean up event listeners
    socket.off("close", handleSocketEvent).off("drain", handleSocketEvent);
  }
}

module.exports = streamAsyncIterableToSocket;