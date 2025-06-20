/**
 * Pipes a readable stream to a custom writable stream handler with robust error and flow control.
 * Ensures proper cleanup, backpressure management, and error propagation using microtasks.
 *
 * @param {object} abortSignal - Abort signal or controller for stream cancellation.
 * @param {object} readableStream - The source readable stream to pipe from.
 * @param {object} client - The client object managing the request/connection.
 * @param {object} request - The request object associated with the stream.
 * @param {object} socket - The underlying network socket.
 * @param {number} contentLength - The expected content length for the stream body.
 * @param {object} headers - The headers associated with the request.
 * @param {boolean} expectsPayload - Whether the request expects a payload.
 */
function pipeStreamWithQueueMicrotaskHandling(
  abortSignal,
  readableStream,
  client,
  request,
  socket,
  contentLength,
  headers,
  expectsPayload
) {
  // Ensure the stream body is not pipelined if not allowed
  l9(
    contentLength !== 0 || client[LZ] === 0,
    "stream body cannot be pipelined"
  );

  let isClosed = false;

  // Create a custom writable stream handler
  const writableHandler = new vd1({
    abort: abortSignal,
    socket: socket,
    request: request,
    contentLength: contentLength,
    client: client,
    expectsPayload: expectsPayload,
    header: headers
  });

  /**
   * Handles incoming data from the readable stream.
   * Pauses the stream if the writable handler signals backpressure.
   * @param {Buffer|string} chunk - The data chunk from the readable stream.
   */
  const onData = function (chunk) {
    if (isClosed) return;
    try {
      // If write returns false, apply backpressure by pausing the stream
      if (!writableHandler.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (error) {
      // Destroy the readable stream on write error
      E4.destroy(this, error);
    }
  };

  /**
   * Handles the 'drain' event from the socket to resume the readable stream.
   */
  const onDrain = function () {
    if (isClosed) return;
    if (readableStream.resume) {
      readableStream.resume();
    }
  };

  /**
   * Handles the 'close' event from the readable stream.
   * Schedules error handler cleanup and emits a synthetic error if not already closed.
   */
  const onClose = function () {
    queueMicrotask(() => {
      readableStream.removeListener("error", onErrorOrEnd);
    });
    if (!isClosed) {
      const syntheticError = new kh0();
      queueMicrotask(() => onErrorOrEnd(syntheticError));
    }
  };

  /**
   * Handles errors and end-of-stream events, ensuring proper cleanup.
   * @param {Error|null} error - The error that occurred, or null on normal end.
   */
  const onErrorOrEnd = function (error) {
    if (isClosed) return;
    isClosed = true;

    // Validate socket state
    l9(socket.destroyed || (socket[GR] && client[LZ] <= 1));

    // Remove all event listeners
    socket.off("drain", onDrain).off("error", onErrorOrEnd);
    readableStream
      .removeListener("data", onData)
      .removeListener("end", onErrorOrEnd)
      .removeListener("close", onClose);

    // Attempt to end the writable handler if no error
    if (!error) {
      try {
        writableHandler.end();
      } catch (endError) {
        error = endError;
      }
    }

    // Destroy the writable handler
    writableHandler.destroy(error);

    // Destroy the readable stream if error is not a special reset
    if (
      error &&
      (error.code !== "UND_ERR_INFO" || error.message !== "reset")
    ) {
      E4.destroy(readableStream, error);
    } else {
      E4.destroy(readableStream);
    }
  };

  // Attach event listeners for data, end, error, and close
  readableStream
    .on("data", onData)
    .on("end", onErrorOrEnd)
    .on("error", onErrorOrEnd)
    .on("close", onClose);

  // Resume the readable stream if possible
  if (readableStream.resume) {
    readableStream.resume();
  }

  // Attach socket event listeners for drain and error
  socket.on("drain", onDrain).on("error", onErrorOrEnd);

  // Handle already emitted error, end, or close events
  if (readableStream.errorEmitted ?? readableStream.errored) {
    setImmediate(() => onErrorOrEnd(readableStream.errored));
  } else if (readableStream.endEmitted ?? readableStream.readableEnded) {
    setImmediate(() => onErrorOrEnd(null));
  }
  if (readableStream.closeEmitted ?? readableStream.closed) {
    setImmediate(onClose);
  }
}

module.exports = pipeStreamWithQueueMicrotaskHandling;