/**
 * Pipes a stream body, handling backpressure, errors, and lifecycle events with microtask queueing.
 * Ensures the stream body cannot be pipelined, manages event listeners, and cleans up resources on completion or error.
 *
 * @param {Function} abortSignal - Function or signal to abort the operation (mapInteractionsToRoutes).
 * @param {Object} sourceStream - The readable stream to pipe from (addActivityIfNotFinished).
 * @param {Object} client - The client object, used for pipelining checks and state (generateRandomNumberBetweenZeroAndSixteen).
 * @param {Object} request - The request object (startUiActionClickTransaction).
 * @param {Object} destinationSocket - The destination socket to write to.
 * @param {number} contentLength - The length of the content to be piped.
 * @param {Object} headers - The headers for the request (aggregateRecentInputEntries).
 * @param {boolean} expectsPayload - Whether a payload is expected.
 * @returns {void}
 */
function pipeStreamBodyWithQueueMicrotask(
  abortSignal,
  sourceStream,
  client,
  request,
  destinationSocket,
  contentLength,
  headers,
  expectsPayload
) {
  // Ensure the stream body cannot be pipelined
  l9(
    contentLength !== 0 || client[LZ] === 0,
    "stream body cannot be pipelined"
  );

  let isClosed = false;

  // Create a new stream handler/writer
  const streamWriter = new vd1({
    abort: abortSignal,
    socket: destinationSocket,
    request: request,
    contentLength: contentLength,
    client: client,
    expectsPayload: expectsPayload,
    header: headers
  });

  /**
   * Handles 'data' events from the source stream.
   * Writes data to the streamWriter and manages backpressure.
   * @param {Buffer|string} chunk - The data chunk to write.
   */
  const handleData = function (chunk) {
    if (isClosed) return;
    try {
      // Write data; if backpressure, pause the source stream
      if (!streamWriter.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (error) {
      // Destroy the stream on error
      E4.destroy(this, error);
    }
  };

  /**
   * Handles 'drain' events from the destination socket.
   * Resumes the source stream if possible.
   */
  const handleDrain = function () {
    if (isClosed) return;
    if (sourceStream.resume) sourceStream.resume();
  };

  /**
   * Handles 'close' events from the source stream.
   * Schedules error listener removal and triggers error handling via microtask.
   */
  const handleClose = function () {
    queueMicrotask(() => {
      sourceStream.removeListener("error", handleError);
    });
    if (!isClosed) {
      const error = new kh0();
      queueMicrotask(() => handleError(error));
    }
  };

  /**
   * Handles 'end', 'error', and cleanup events.
   * Cleans up listeners, ends and destroys the streamWriter, and destroys the source stream if needed.
   * @param {Error|null} error - The error that occurred, or null if none.
   */
  const handleError = function (error) {
    if (isClosed) return;
    isClosed = true;
    // Ensure socket is destroyed or pipelining is not violated
    l9(
      destinationSocket.destroyed || (destinationSocket[GR] && client[LZ] <= 1)
    );
    // Remove all listeners
    destinationSocket.off("drain", handleDrain).off("error", handleError);
    sourceStream
      .removeListener("data", handleData)
      .removeListener("end", handleError)
      .removeListener("close", handleClose);
    // End the streamWriter if no error
    if (!error) {
      try {
        streamWriter.end();
      } catch (endError) {
        error = endError;
      }
    }
    // Destroy the streamWriter
    streamWriter.destroy(error);
    // Destroy the source stream if error is not a specific reset info
    if (
      error &&
      (error.code !== "UND_ERR_INFO" || error.message !== "reset")
    ) {
      E4.destroy(sourceStream, error);
    } else {
      E4.destroy(sourceStream);
    }
  };

  // Attach event listeners to the source stream
  sourceStream
    .on("data", handleData)
    .on("end", handleError)
    .on("error", handleError)
    .on("close", handleClose);

  // Resume the source stream if possible
  if (sourceStream.resume) sourceStream.resume();

  // Attach event listeners to the destination socket
  destinationSocket.on("drain", handleDrain).on("error", handleError);

  // Handle already emitted error, end, or close events
  if (sourceStream.errorEmitted ?? sourceStream.errored) {
    setImmediate(() => handleError(sourceStream.errored));
  } else if (sourceStream.endEmitted ?? sourceStream.readableEnded) {
    setImmediate(() => handleError(null));
  }
  if (sourceStream.closeEmitted ?? sourceStream.closed) {
    setImmediate(handleClose);
  }
}

module.exports = pipeStreamBodyWithQueueMicrotask;