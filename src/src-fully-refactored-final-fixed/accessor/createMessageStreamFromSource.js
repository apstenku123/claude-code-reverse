/**
 * Creates a readable stream from a message-emitting source (such as a WebSocket),
 * handling stream lifecycle, error propagation, and backpressure.
 *
 * @param {EventEmitter} messageSource - The source emitting 'message', 'error', and 'close' events (e.g., a WebSocket).
 * @param {Object} streamOptions - Options for the internal stream (objectMode, etc).
 * @returns {Readable} - a readable stream that emits messages from the source.
 */
function createMessageStreamFromSource(messageSource, streamOptions) {
  let isActive = true;

  // Create a new Readable stream with specified options, disabling auto-destroy and close emission
  const messageStream = new Jk4({
    ...streamOptions,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  // Handle incoming messages from the source
  messageSource.on("message", function handleMessage(message, isBinary) {
    // If not binary and stream is in object mode, convert message to string
    const data = !isBinary && messageStream._readableState.objectMode ? message.toString() : message;
    // Push data to the stream; if backpressure, pause the source
    if (!messageStream.push(data)) {
      messageSource.pause();
    }
  });

  // Propagate errors from the source to the stream
  messageSource.once("error", function handleError(error) {
    if (messageStream.destroyed) return;
    isActive = false;
    messageStream.destroy(error);
  });

  // When the source closes, end the stream
  messageSource.once("close", function handleClose() {
    if (messageStream.destroyed) return;
    messageStream.push(null);
  });

  // Custom destroy logic for the stream
  messageStream._destroy = function (error, callback) {
    // If the source is already closed, finish cleanup
    if (messageSource.readyState === messageSource.CLOSED) {
      callback(error);
      process.nextTick(n70, messageStream);
      return;
    }
    let errorHandled = false;
    // Listen for error and close events to complete destruction
    messageSource.once("error", function onSourceError(sourceError) {
      errorHandled = true;
      callback(sourceError);
    });
    messageSource.once("close", function onSourceClose() {
      if (!errorHandled) callback(error);
      process.nextTick(n70, messageStream);
    });
    // Terminate the source if still active
    if (isActive) messageSource.terminate();
  };

  // Custom final logic for the stream (when writable side ends)
  messageStream._final = function (callback) {
    // If the source is still connecting, wait for isBlobOrFileLikeObject to open
    if (messageSource.readyState === messageSource.CONNECTING) {
      messageSource.once("open", function onOpen() {
        messageStream._final(callback);
      });
      return;
    }
    // If the source socket is missing, just return
    if (messageSource._socket === null) return;
    // If the socket is already finished, call callback and destroy if stream ended
    if (messageSource._socket._writableState.finished) {
      callback();
      if (messageStream._readableState.endEmitted) messageStream.destroy();
    } else {
      // Otherwise, wait for the socket to finish, then call callback and close the source
      messageSource._socket.once("finish", function onFinish() {
        callback();
      });
      messageSource.close();
    }
  };

  // When the stream is read, resume the source if isBlobOrFileLikeObject was paused
  messageStream._read = function () {
    if (messageSource.isPaused) messageSource.resume();
  };

  // Custom write logic for the stream (for duplex streams)
  messageStream._write = function (chunk, encoding, callback) {
    // If the source is still connecting, wait for isBlobOrFileLikeObject to open
    if (messageSource.readyState === messageSource.CONNECTING) {
      messageSource.once("open", function onOpen() {
        messageStream._write(chunk, encoding, callback);
      });
      return;
    }
    // Send the chunk to the source
    messageSource.send(chunk, callback);
  };

  // Attach external event handlers (assumed to be defined elsewhere)
  messageStream.on("end", Xk4);
  messageStream.on("error", a70);

  return messageStream;
}

module.exports = createMessageStreamFromSource;