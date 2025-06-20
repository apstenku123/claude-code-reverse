/**
 * Creates a readable stream from a WebSocket-like source, forwarding messages and handling lifecycle events.
 *
 * @param {WebSocket} webSocketSource - The WebSocket-like source to read messages from.
 * @param {Object} streamOptions - Configuration options for the stream.
 * @returns {Readable} a Node.js Readable stream that emits messages from the WebSocket source.
 */
function createReadableStreamFromWebSocket(webSocketSource, streamOptions) {
  // Indicates whether the stream is still subscribed to the source
  let isSubscribed = true;

  // Create a Readable stream with specific options
  const readableStream = new Jk4({
    ...streamOptions,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  // Forward incoming messages from the WebSocket to the stream
  webSocketSource.on("message", function handleMessage(message, isBinary) {
    // If not binary and objectMode is enabled, convert message to string
    const data = !isBinary && readableStream._readableState.objectMode ? message.toString() : message;
    // Push data to the stream; if push returns false, pause the WebSocket
    if (!readableStream.push(data)) {
      webSocketSource.pause();
    }
  });

  // Handle errors from the WebSocket source
  webSocketSource.once("error", function handleError(error) {
    if (readableStream.destroyed) return;
    isSubscribed = false;
    readableStream.destroy(error);
  });

  // Handle close event from the WebSocket source
  webSocketSource.once("close", function handleClose() {
    if (readableStream.destroyed) return;
    readableStream.push(null); // Signal end of stream
  });

  // Custom _destroy implementation for the stream
  readableStream._destroy = function (error, callback) {
    // If the WebSocket is already closed, cleanup and finish
    if (webSocketSource.readyState === webSocketSource.CLOSED) {
      callback(error);
      process.nextTick(n70, readableStream);
      return;
    }
    let errorHandled = false;
    // Listen for error event to handle errors during close
    webSocketSource.once("error", function onError(wsError) {
      errorHandled = true;
      callback(wsError);
    });
    // Listen for close event to finish cleanup
    webSocketSource.once("close", function onClose() {
      if (!errorHandled) callback(error);
      process.nextTick(n70, readableStream);
    });
    // If still subscribed, terminate the WebSocket
    if (isSubscribed) {
      webSocketSource.terminate();
    }
  };

  // Custom _final implementation for the stream (when writable ends)
  readableStream._final = function (callback) {
    // If WebSocket is still connecting, wait for isBlobOrFileLikeObject to open
    if (webSocketSource.readyState === webSocketSource.CONNECTING) {
      webSocketSource.once("open", function onOpen() {
        readableStream._final(callback);
      });
      return;
    }
    // If socket is null, nothing to do
    if (webSocketSource._socket === null) return;
    // If socket is already finished, call callback and destroy if ended
    if (webSocketSource._socket._writableState.finished) {
      callback();
      if (readableStream._readableState.endEmitted) readableStream.destroy();
    } else {
      // Otherwise, wait for finish event then close the WebSocket
      webSocketSource._socket.once("finish", function onFinish() {
        callback();
      });
      webSocketSource.close();
    }
  };

  // Custom _read implementation to resume the WebSocket if paused
  readableStream._read = function () {
    if (webSocketSource.isPaused) {
      webSocketSource.resume();
    }
  };

  // Custom _write implementation to send data through the WebSocket
  readableStream._write = function (chunk, encoding, callback) {
    // If WebSocket is still connecting, wait for isBlobOrFileLikeObject to open
    if (webSocketSource.readyState === webSocketSource.CONNECTING) {
      webSocketSource.once("open", function onOpen() {
        readableStream._write(chunk, encoding, callback);
      });
      return;
    }
    webSocketSource.send(chunk, callback);
  };

  // Attach external event handlers (assumed to be defined elsewhere)
  readableStream.on("end", Xk4);
  readableStream.on("error", a70);

  return readableStream;
}

module.exports = createReadableStreamFromWebSocket;