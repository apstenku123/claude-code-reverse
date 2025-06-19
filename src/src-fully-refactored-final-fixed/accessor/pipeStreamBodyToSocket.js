/**
 * Pipes the body of a readable stream to a socket, handling backpressure, errors, and stream lifecycle events.
 * Ensures that the stream body is not pipelined and manages cleanup on errors or completion.
 *
 * @param {Function} abortSignal - Signal or function to abort the operation (processInteractionEntries).
 * @param {Object} readableStream - The readable stream whose data will be piped (not yet refactored).
 * @param {Object} clientSubscription - Client subscription or request context (not yet refactored).
 * @param {Object} requestObject - The request object associated with the stream (not yet refactored).
 * @param {Object} socket - The socket to which the stream data is written.
 * @param {number} contentLength - The expected length of the content being streamed.
 * @param {Object} headerObject - Header information for the stream (processRecentInputEntries).
 * @param {boolean} expectsPayload - Indicates if a payload is expected for the stream.
 */
function pipeStreamBodyToSocket(
  abortSignal,
  readableStream,
  clientSubscription,
  requestObject,
  socket,
  contentLength,
  headerObject,
  expectsPayload
) {
  // Ensure the stream body is not pipelined
  l9(
    contentLength !== 0 || clientSubscription[LZ] === 0,
    "stream body cannot be pipelined"
  );

  let isClosed = false;

  // Create a new stream writer/handler
  const streamHandler = new vd1({
    abort: abortSignal,
    socket: socket,
    request: requestObject,
    contentLength: contentLength,
    client: clientSubscription,
    expectsPayload: expectsPayload,
    header: headerObject
  });

  /**
   * Handles incoming data from the readable stream.
   * Pauses the stream if backpressure is detected.
   * @param {Buffer|string} chunk - The data chunk from the stream.
   */
  const onData = function (chunk) {
    if (isClosed) return;
    try {
      // Write data to the stream handler; pause if backpressure
      if (!streamHandler.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (error) {
      // Destroy the stream on error
      E4.destroy(this, error);
    }
  };

  /**
   * Handles the 'drain' event on the socket, resuming the readable stream if possible.
   */
  const onDrain = function () {
    if (isClosed) return;
    if (readableStream.resume) {
      readableStream.resume();
    }
  };

  /**
   * Handles the 'close' event on the readable stream, ensuring cleanup.
   */
  const onClose = function () {
    // Remove error listener asynchronously
    queueMicrotask(() => {
      readableStream.removeListener("error", onErrorOrEnd);
    });
    if (!isClosed) {
      // Create a new error to signal closure
      const closeError = new kh0();
      queueMicrotask(() => onErrorOrEnd(closeError));
    }
  };

  /**
   * Handles errors or end of stream, performing cleanup and destroying resources.
   * @param {Error|null} error - The error that occurred, or null if stream ended cleanly.
   */
  const onErrorOrEnd = function (error) {
    if (isClosed) return;
    isClosed = true;
    // Validate socket state
    l9(socket.destroyed || (socket[GR] && clientSubscription[LZ] <= 1));
    // Remove all listeners
    socket.off("drain", onDrain).off("error", onErrorOrEnd);
    readableStream
      .removeListener("data", onData)
      .removeListener("end", onErrorOrEnd)
      .removeListener("close", onClose);
    // Attempt to end the stream handler if no error
    if (!error) {
      try {
        streamHandler.end();
      } catch (endError) {
        error = endError;
      }
    }
    // Destroy the stream handler
    streamHandler.destroy(error);
    // Destroy the readable stream if error is not a specific reset error
    if (
      error &&
      (error.code !== "UND_ERR_INFO" || error.message !== "reset")
    ) {
      E4.destroy(readableStream, error);
    } else {
      E4.destroy(readableStream);
    }
  };

  // Attach event listeners to the readable stream
  readableStream
    .on("data", onData)
    .on("end", onErrorOrEnd)
    .on("error", onErrorOrEnd)
    .on("close", onClose);

  // Resume the stream if possible
  if (readableStream.resume) {
    readableStream.resume();
  }

  // Attach event listeners to the socket
  socket.on("drain", onDrain).on("error", onErrorOrEnd);

  // Handle already emitted errors or end events
  if (readableStream.errorEmitted ?? readableStream.errored) {
    setImmediate(() => onErrorOrEnd(readableStream.errored));
  } else if (readableStream.endEmitted ?? readableStream.readableEnded) {
    setImmediate(() => onErrorOrEnd(null));
  }
  if (readableStream.closeEmitted ?? readableStream.closed) {
    setImmediate(onClose);
  }
}

module.exports = pipeStreamBodyToSocket;
