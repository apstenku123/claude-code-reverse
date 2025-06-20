/**
 * Handles the closure of a WebSocket connection by updating its state,
 * publishing a socket error event if there are subscribers, and destroying the current instance.
 *
 * @param {any} socketErrorData - The error data or event to publish to subscribers.
 * @returns {void}
 */
function handleWebSocketClosure(socketErrorData) {
  // Destructure the WebSocket configuration from the current instance
  const { ws: webSocketConfig } = this;

  // Set the WebSocket state to CLOSING
  webSocketConfig[nr] = ir.CLOSING;

  // If there are subscribers to the socketError event, publish the error data
  if (lh.socketError.hasSubscribers) {
    lh.socketError.publish(socketErrorData);
  }

  // Destroy the current instance to clean up resources
  this.destroy();
}

module.exports = handleWebSocketClosure;