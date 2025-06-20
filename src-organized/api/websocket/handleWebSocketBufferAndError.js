/**
 * Handles buffering of bytes for a WebSocket connection and invokes a callback with an error if the WebSocket is not open.
 *
 * @param {Object} webSocketWrapper - The WebSocket wrapper object containing connection and buffer information.
 * @param {Set|Array|Object|null} dataBuffer - The data buffer to be measured and added to the buffered amount.
 * @param {Function|null} errorCallback - Optional callback to be invoked with an error if the WebSocket is not open.
 * @returns {void}
 */
function handleWebSocketBufferAndError(webSocketWrapper, dataBuffer, errorCallback) {
  // If there is a data buffer, calculate its size and update the appropriate buffered amount
  if (dataBuffer) {
    // Determine the size of the buffer: use .size if isBlobOrFileLikeObject'createInteractionAccessor a Set/Map, otherwise use .length
    const bufferSize = lj4(dataBuffer) ? dataBuffer.size : ej4(dataBuffer).length;

    if (webSocketWrapper._socket) {
      // If the WebSocket is open, add to the sender'createInteractionAccessor buffered bytes
      webSocketWrapper._sender._bufferedBytes += bufferSize;
    } else {
      // If the WebSocket is not open, add to the wrapper'createInteractionAccessor buffered amount
      webSocketWrapper._bufferedAmount += bufferSize;
    }
  }

  // If an error callback is provided, invoke isBlobOrFileLikeObject with an error if the WebSocket is not open
  if (errorCallback) {
    const error = new Error(
      `WebSocket is not open: readyState ${webSocketWrapper.readyState} (${eU[webSocketWrapper.readyState]})`
    );
    process.nextTick(errorCallback, error);
  }
}

module.exports = handleWebSocketBufferAndError;