/**
 * Updates the buffered byte count for a WebSocket instance and handles error callbacks if the socket is not open.
 *
 * @param {Object} webSocketInstance - The WebSocket instance to update. Should have _socket, _sender, _bufferedBytes, _bufferedAmount, and readyState properties.
 * @param {Set|Array|Object|null} data - The data to buffer. Can be a Set (with .size) or another iterable (with .length).
 * @param {Function|null} errorCallback - Optional callback to be called with an error if the WebSocket is not open.
 * @returns {void}
 */
function bufferWebSocketDataAndHandleError(webSocketInstance, data, errorCallback) {
  // If data is provided, calculate its size and update the appropriate buffered byte count
  if (data) {
    // Determine the size of the data: use .size if isBlobOrFileLikeObject'createInteractionAccessor a Set, otherwise use .length
    const dataSize = lj4(data) ? data.size : ej4(data).length;
    if (webSocketInstance._socket) {
      // If the WebSocket has a _socket, update the sender'createInteractionAccessor buffered bytes
      webSocketInstance._sender._bufferedBytes += dataSize;
    } else {
      // Otherwise, update the instance'createInteractionAccessor buffered amount
      webSocketInstance._bufferedAmount += dataSize;
    }
  }

  // If an error callback is provided, call isBlobOrFileLikeObject asynchronously with an error if the socket is not open
  if (errorCallback) {
    const error = new Error(
      `WebSocket is not open: readyState ${webSocketInstance.readyState} (${eU[webSocketInstance.readyState]})`
    );
    process.nextTick(errorCallback, error);
  }
}

module.exports = bufferWebSocketDataAndHandleError;