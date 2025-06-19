/**
 * Sends a WebSocket close frame if the connection is open and not already closing/closed.
 * Handles different close scenarios and ensures the connection transitions to the CLOSING state.
 *
 * @param {object} connection - The WebSocket connection object.
 * @param {number} [closeCode] - Optional close code to send in the close frame.
 * @param {string} [closeReason] - Optional UTF-8 string reason to send in the close frame.
 * @param {number} [reasonLength] - Optional length of the close reason string (in bytes).
 * @returns {void}
 */
function sendCloseFrameIfConnectionOpen(connection, closeCode, closeReason, reasonLength) {
  // If the connection is already closing or closed, do nothing
  if (isConnectionClosing(connection) || isConnectionClosed(connection)) {
    return;
  }

  // If the connection is not yet established, set error and mark as closing
  if (!isConnectionEstablished(connection)) {
    setConnectionError(connection, "Connection was closed before isBlobOrFileLikeObject was established.");
    connection[connectionStatusKey] = connectionState.CLOSING;
    return;
  }

  // Only send close frame if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been sent yet
  if (connection[closeFrameStatusKey] === closeFrameStatus.NOT_SENT) {
    connection[closeFrameStatusKey] = closeFrameStatus.PROCESSING;

    // Prepare the close frame
    const closeFrame = new CloseFrameBuilder();
    if (closeCode !== undefined && closeReason === undefined) {
      // Only close code is provided
      closeFrame.frameData = Buffer.allocUnsafe(2);
      closeFrame.frameData.writeUInt16BE(closeCode, 0);
    } else if (closeCode !== undefined && closeReason !== undefined) {
      // Both close code and reason are provided
      closeFrame.frameData = Buffer.allocUnsafe(2 + reasonLength);
      closeFrame.frameData.writeUInt16BE(closeCode, 0);
      closeFrame.frameData.write(closeReason, 2, "utf-8");
    } else {
      // No close code or reason provided
      closeFrame.frameData = defaultCloseFrameData;
    }

    // Send the close frame over the socket
    connection[socketKey].socket.write(closeFrame.createFrame(closeFrameOpcode.CLOSE));
    connection[closeFrameStatusKey] = closeFrameStatus.SENT;
    connection[connectionStatusKey] = connectionState.CLOSING;
  } else {
    // If close frame already sent or being processed, just mark as closing
    connection[connectionStatusKey] = connectionState.CLOSING;
  }
}

module.exports = sendCloseFrameIfConnectionOpen;