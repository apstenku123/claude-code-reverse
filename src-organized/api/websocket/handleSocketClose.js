/**
 * Handles the closing process of a socket connection, ensuring all listeners are removed,
 * pending data is processed, and the receiver is properly finalized. Emits the close event
 * if the receiver is finished or has encountered an error; otherwise, sets up listeners for
 * receiver completion or error.
 *
 * @function handleSocketClose
 * @this {WebSocketLike}
 * @returns {void}
 */
function handleSocketClose() {
  // Retrieve the connection state object from the instance using the zI symbol/key
  const connectionState = this[zI];

  // Remove event listeners related to the socket lifecycle
  this.removeListener("close", handleSocketClose);
  this.removeListener("data", handleSocketData);
  this.removeListener("end", handleSocketEnd);

  // Set the connection'createInteractionAccessor ready state to CLOSING
  connectionState._readyState = O4.CLOSING;

  // If the stream has not ended, no close frame received, and no receiver error, try to read pending data
  let pendingData;
  const isEndEmitted = this._readableState.endEmitted;
  const isCloseFrameReceived = connectionState._closeFrameReceived;
  const isReceiverErrored = connectionState._receiver._writableState.errorEmitted;

  if (!isEndEmitted && !isCloseFrameReceived && !isReceiverErrored) {
    pendingData = connectionState._socket.read();
    if (pendingData !== null) {
      // Write any remaining data to the receiver
      connectionState._receiver.write(pendingData);
    }
  }

  // Finalize the receiver
  connectionState._receiver.end();

  // Clear the connection state and any close timer
  this[zI] = undefined;
  clearTimeout(connectionState._closeTimer);

  // If the receiver is finished or has errored, emit the close event
  const isReceiverFinished = connectionState._receiver._writableState.finished;
  if (isReceiverFinished || isReceiverErrored) {
    connectionState.emitClose();
  } else {
    // Otherwise, listen for receiver error or finish to emit close later
    connectionState._receiver.on("error", handleReceiverCloseOrError);
    connectionState._receiver.on("finish", handleReceiverCloseOrError);
  }
}

module.exports = handleSocketClose;