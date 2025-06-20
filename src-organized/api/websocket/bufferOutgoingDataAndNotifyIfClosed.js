/**
 * Handles buffering of outgoing data for a WebSocket-like object and notifies via callback if the socket is not open.
 *
 * @param {Object} webSocketWrapper - The WebSocket-like object containing buffering and state information.
 * @param {Object|Set|Array} outgoingData - The data to be buffered. Can be a Set (with .size) or an Array-like object (with .length).
 * @param {Function} notOpenCallback - Optional callback to be invoked if the WebSocket is not open.
 * @returns {void}
 */
function bufferOutgoingDataAndNotifyIfClosed(webSocketWrapper, outgoingData, notOpenCallback) {
  if (outgoingData) {
    // Determine the size of the outgoing data
    const dataSize = lj4(outgoingData) ? outgoingData.size : ej4(outgoingData).length;

    // Buffer the data size in the appropriate property depending on socket state
    if (webSocketWrapper._socket) {
      webSocketWrapper._sender._bufferedBytes += dataSize;
    } else {
      webSocketWrapper._bufferedAmount += dataSize;
    }
  }

  if (notOpenCallback) {
    // Create an error indicating the WebSocket is not open
    const error = new Error(
      `WebSocket is not open: readyState ${webSocketWrapper.readyState} (${eU[webSocketWrapper.readyState]})`
    );
    // Schedule the callback to be called asynchronously with the error
    process.nextTick(notOpenCallback, error);
  }
}

module.exports = bufferOutgoingDataAndNotifyIfClosed;