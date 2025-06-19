/**
 * Handles the closing of a WebSocket connection, cleans up event listeners,
 * determines close code and reason, updates connection state, and notifies subscribers.
 *
 * @returns {void} No return value.
 */
function handleWebSocketClose() {
  // Destructure the WebSocket wrapper from the current context
  const { ws: webSocketWrapper } = this;

  // Extract the connection state/config using the Il0 symbol
  const { [Il0]: connectionState } = webSocketWrapper;

  // Remove event listeners for 'data', 'close', and 'error' events
  connectionState.socket.off("data", Gl0);
  connectionState.socket.off("close", handleWebSocketClose);
  connectionState.socket.off("error", Dl0);

  // Determine if the close was clean (wasClean)
  const wasClean = webSocketWrapper[QW1] === BW1.SENT && webSocketWrapper[Bl0];

  // Default close code and reason
  let closeCode = 1005;
  let closeReason = "";

  // Extract closing information if available
  const closingInfo = webSocketWrapper[Ql0].closingInfo;

  if (closingInfo && !closingInfo.error) {
    // Use provided close code and reason if available
    closeCode = closingInfo.code ?? 1005;
    closeReason = closingInfo.reason;
  } else if (!webSocketWrapper[Bl0]) {
    // If not clean, set code to 1006 (abnormal closure)
    closeCode = 1006;
  }

  // Update the WebSocket state to CLOSED
  webSocketWrapper[nr] = ir.CLOSED;

  // Notify listeners about the close event
  lE6(
    "close",
    webSocketWrapper,
    (detail, context) => new rE6(detail, context),
    {
      wasClean,
      code: closeCode,
      reason: closeReason
    }
  );

  // If there are subscribers to the close event, publish the close details
  if (lh.close.hasSubscribers) {
    lh.close.publish({
      websocket: webSocketWrapper,
      code: closeCode,
      reason: closeReason
    });
  }
}

module.exports = handleWebSocketClose;