/**
 * Creates a readable stream from a message-emitting source (such as a WebSocket),
 * handling message, error, and close events, and providing proper stream lifecycle management.
 *
 * @param {EventEmitter} messageSource - The source object that emits 'message', 'error', and 'close' events (e.g., a WebSocket).
 * @param {Object} streamOptions - Configuration options for the underlying stream.
 * @returns {ReadableStream} a readable stream that emits incoming messages from the source.
 */
function createMessageStream(messageSource, streamOptions) {
  let isActive = true;

  // Create the readable stream with specific options
  const messageStream = new Jk4({
    ...streamOptions,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  // Handle incoming messages from the source
  messageSource.on("message", function handleMessage(message, isBinary) {
    // If not binary and in object mode, convert to string; otherwise, pass as is
    const data = !isBinary && messageStream._readableState.objectMode ? message.toString() : message;
    // Push data to the stream; if push returns false, pause the source
    if (!messageStream.push(data)) {
      messageSource.pause();
    }
  });

  // Handle errors from the source
  messageSource.once("error", function handleError(error) {
    if (messageStream.destroyed) return;
    isActive = false;
    messageStream.destroy(error);
  });

  // Handle source close event
  messageSource.once("close", function handleClose() {
    if (messageStream.destroyed) return;
    // Signal end of stream
    messageStream.push(null);
  });

  // Custom destroy logic for the stream
  messageStream._destroy = function (error, callback) {
    // If the source is already closed, finalize and cleanup
    if (messageSource.readyState === messageSource.CLOSED) {
      callback(error);
      process.nextTick(n70, messageStream);
      return;
    }
    let errorEmitted = false;
    // Listen for error and close events to ensure proper cleanup
    messageSource.once("error", function onSourceError(sourceError) {
      errorEmitted = true;
      callback(sourceError);
    });
    messageSource.once("close", function onSourceClose() {
      if (!errorEmitted) callback(error);
      process.nextTick(n70, messageStream);
    });
    // If still active, terminate the source
    if (isActive) messageSource.terminate();
  };

  // Custom final logic for the stream (when writable ends)
  messageStream._final = function (callback) {
    // If the source is still connecting, wait for isBlobOrFileLikeObject to open
    if (messageSource.readyState === messageSource.CONNECTING) {
      messageSource.once("open", function onOpen() {
        messageStream._final(callback);
      });
      return;
    }
    // If there'createInteractionAccessor no underlying socket, just return
    if (messageSource._socket === null) return;
    // If the socket is already finished, call the callback and destroy if needed
    if (messageSource._socket._writableState.finished) {
      callback();
      if (messageStream._readableState.endEmitted) messageStream.destroy();
    } else {
      // Otherwise, wait for the socket to finish, then call the callback and close the source
      messageSource._socket.once("finish", function onFinish() {
        callback();
      });
      messageSource.close();
    }
  };

  // Custom read logic: resume the source if isBlobOrFileLikeObject'createInteractionAccessor paused
  messageStream._read = function () {
    if (messageSource.isPaused) messageSource.resume();
  };

  // Custom write logic: send data through the source
  messageStream._write = function (chunk, encoding, callback) {
    // If the source is still connecting, wait for isBlobOrFileLikeObject to open
    if (messageSource.readyState === messageSource.CONNECTING) {
      messageSource.once("open", function onOpen() {
        messageStream._write(chunk, encoding, callback);
      });
      return;
    }
    messageSource.send(chunk, callback);
  };

  // Attach additional event handlers (assumed to be cleanup or error handlers)
  messageStream.on("end", Xk4);
  messageStream.on("error", a70);

  return messageStream;
}

module.exports = createMessageStream;