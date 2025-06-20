/**
 * Updates the buffered byte count for outgoing WebSocket data and handles the case when the socket is not open.
 *
 * @param {Object} webSocketWrapper - The WebSocket wrapper object containing socket and buffer information.
 * @param {Object|Iterable} outgoingData - The data to be sent, used to calculate the number of bytes to buffer.
 * @param {Function} [callback] - Optional callback to invoke with an error if the WebSocket is not open.
 * @returns {void}
 */
function bufferOutgoingDataAndHandleNotOpenError(webSocketWrapper, outgoingData, callback) {
  // If there is outgoing data, calculate its size and update the appropriate buffer
  if (outgoingData) {
    // Determine the size of the outgoing data
    const dataSize = lj4(outgoingData) ? outgoingData.size : ej4(outgoingData).length;

    // If the WebSocket is open, update the sender'createInteractionAccessor buffered bytes; otherwise, update the wrapper'createInteractionAccessor buffered amount
    if (webSocketWrapper._socket) {
      webSocketWrapper._sender._bufferedBytes += dataSize;
    } else {
      webSocketWrapper._bufferedAmount += dataSize;
    }
  }

  // If a callback is provided, the WebSocket is not open; notify via callback on next tick
  if (callback) {
    const error = new Error(
      `WebSocket is not open: readyState ${webSocketWrapper.readyState} (${eU[webSocketWrapper.readyState]})`
    );
    process.nextTick(callback, error);
  }
}

module.exports = bufferOutgoingDataAndHandleNotOpenError;