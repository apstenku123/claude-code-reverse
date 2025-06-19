/**
 * Handles WebSocket client errors by emitting a custom event if listeners are present,
 * otherwise delegates error handling to a fallback function.
 *
 * @param {EventEmitter} eventSource - The source object that may emit the 'wsClientError' event.
 * @param {Object} config - Configuration object related to the WebSocket client.
 * @param {Object} subscription - The subscription or connection instance associated with the error.
 * @param {Object} requestInfo - Additional information about the request or context.
 * @param {string} errorMessage - The error message to be reported.
 * @returns {void}
 */
function handleWebSocketClientError(eventSource, config, subscription, requestInfo, errorMessage) {
  // Check if there are listeners for the 'wsClientError' event
  if (eventSource.listenerCount("wsClientError")) {
    // Create an Error object with the provided error message
    const error = new Error(errorMessage);
    // Capture the stack trace, omitting this function from the trace
    Error.captureStackTrace(error, handleWebSocketClientError);
    // Emit the 'wsClientError' event with the error, subscription, and config
    eventSource.emit("wsClientError", error, subscription, config);
  } else {
    // If no listeners, delegate error handling to the fallback function 'sendHttpResponse'
    sendHttpResponse(subscription, requestInfo, errorMessage);
  }
}

module.exports = handleWebSocketClientError;
