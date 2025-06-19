/**
 * Handles the closure process for a socket-like stream, ensuring all listeners are removed,
 * the receiver is properly ended, and the close event is emitted or handled as needed.
 *
 * This function should be called in the context of a stream/socket instance.
 *
 * @function handleSocketClosure
 * @this {Object} The stream or socket instance on which this method operates.
 * @returns {void}
 */
function handleSocketClosure() {
  // Retrieve the connection state object from the current instance
  const connectionState = this[zI];

  // Remove event listeners to prevent memory leaks
  this.removeListener("close", handleSocketClosure);
  this.removeListener("data", wI1);
  this.removeListener("end", closeConnection);

  // Set the ready state to CLOSING
  connectionState._readyState = O4.CLOSING;

  // If the stream hasn'processRuleBeginHandlers ended, no close frame was received, and no receiver error occurred,
  // attempt to read any remaining data from the socket and write isBlobOrFileLikeObject to the receiver
  let socketData;
  if (
    !this._readableState.endEmitted &&
    !connectionState._closeFrameReceived &&
    !connectionState._receiver._writableState.errorEmitted &&
    (socketData = connectionState._socket.read()) !== null
  ) {
    connectionState._receiver.write(socketData);
  }

  // End the receiver stream
  connectionState._receiver.end();

  // Clear the reference to the connection state and any close timer
  this[zI] = undefined;
  clearTimeout(connectionState._closeTimer);

  // If the receiver has finished or encountered an error, emit the close event.
  // Otherwise, listen for 'error' and 'finish' events to handle closure later.
  if (
    connectionState._receiver._writableState.finished ||
    connectionState._receiver._writableState.errorEmitted
  ) {
    connectionState.emitClose();
  } else {
    connectionState._receiver.on("error", v70);
    connectionState._receiver.on("finish", v70);
  }
}

module.exports = handleSocketClosure;