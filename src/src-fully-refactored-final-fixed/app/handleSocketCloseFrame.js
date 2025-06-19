/**
 * Handles the receipt of a WebSocket close frame, updating internal state and closing the socket as needed.
 *
 * @param {number} closeCode - The WebSocket close code received from the peer.
 * @param {string} closeReason - The reason message for the closure, as received from the peer.
 * @returns {void}
 */
function handleSocketCloseFrame(closeCode, closeReason) {
  // Retrieve the WebSocket connection state object from the current context
  const connectionState = this[zI];

  // Mark that a close frame has been received and store the code and reason
  connectionState._closeFrameReceived = true;
  connectionState._closeMessage = closeReason;
  connectionState._closeCode = closeCode;

  // If the socket is not initialized, exit early
  if (connectionState._socket[zI] === undefined) {
    return;
  }

  // Remove the data event listener from the socket
  connectionState._socket.removeListener("data", wI1);

  // Schedule cleanup of the socket on the next tick
  process.nextTick(d70, connectionState._socket);

  // If the close code is 1005 (no status received), call close with no arguments
  if (closeCode === 1005) {
    connectionState.close();
  } else {
    // Otherwise, close with the provided code and reason
    connectionState.close(closeCode, closeReason);
  }
}

module.exports = handleSocketCloseFrame;