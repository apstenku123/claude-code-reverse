/**
 * Updates the buffered byte count for outgoing WebSocket data and handles the case when the WebSocket is not open.
 *
 * @param {Object} webSocketInstance - The WebSocket instance or connection object.
 * @param {Buffer|Array|TypedArray|Object} outgoingData - The data intended to be sent over the WebSocket. Can be a Buffer, Array, or similar.
 * @param {Function} notOpenCallback - Optional callback to invoke if the WebSocket is not open. Receives an Error as its argument.
 * @returns {void}
 */
function bufferOutgoingDataAndHandleNotOpen(webSocketInstance, outgoingData, notOpenCallback) {
  // If there is outgoing data, update the buffered byte count
  if (outgoingData) {
    // Determine the size of the outgoing data
    const dataSize = lj4(outgoingData) ? outgoingData.size : ej4(outgoingData).length;

    // Update the appropriate buffered byte count depending on the WebSocket implementation
    if (webSocketInstance._socket) {
      // For native socket, update sender'createInteractionAccessor buffered bytes
      webSocketInstance._sender._bufferedBytes += dataSize;
    } else {
      // For other implementations, update bufferedAmount
      webSocketInstance._bufferedAmount += dataSize;
    }
  }

  // If a callback is provided and the WebSocket is not open, notify via callback
  if (notOpenCallback) {
    const error = new Error(
      `WebSocket is not open: readyState ${webSocketInstance.readyState} (${eU[webSocketInstance.readyState]})`
    );
    process.nextTick(notOpenCallback, error);
  }
}

module.exports = bufferOutgoingDataAndHandleNotOpen;