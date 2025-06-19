/**
 * Handles the WebSocket closing event by publishing a socket error (if there are subscribers)
 * and destroying the current instance.
 *
 * @param {any} socketErrorEvent - The error event or object to be published to subscribers.
 * @returns {void}
 */
function handleWebSocketClosingError(socketErrorEvent) {
  // Destructure the WebSocket configuration from the current instance
  const { ws: webSocketConfig } = this;

  // Set the WebSocket state to CLOSING
  webSocketConfig[nr] = ir.CLOSING;

  // If there are subscribers to the socketError event, publish the error
  if (lh.socketError.hasSubscribers) {
    lh.socketError.publish(socketErrorEvent);
  }

  // Destroy the current instance to clean up resources
  this.destroy();
}

module.exports = handleWebSocketClosingError;