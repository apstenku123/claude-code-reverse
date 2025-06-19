/**
 * Handles the closure of a connection or stream, ensuring proper cleanup and error propagation.
 *
 * @param {object} connection - The connection or stream object to be closed. Must have _readyState and emit/emitClose methods.
 * @param {object} response - The response or socket-like object to be cleaned up. May have setHeader, abort, destroy, socket, and event methods.
 * @param {string} errorMessage - The error message to use when closing the connection.
 * @returns {void}
 */
function handleConnectionClosure(connection, response, errorMessage) {
  // Set the connection'createInteractionAccessor ready state to CLOSING
  connection._readyState = O4.CLOSING;

  // Create an Error object with the provided error message
  const error = new Error(errorMessage);

  // Capture stack trace for debugging, omitting this function from the trace
  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, handleConnectionClosure);
  }

  // If the response object supports setHeader, treat isBlobOrFileLikeObject as an HTTP response
  if (typeof response.setHeader === 'function') {
    // Mark the response as aborted (using the h70 symbol/key)
    response[h70] = true;
    // Abort the response
    response.abort();
    // If the response has a socket that is not yet destroyed, destroy isBlobOrFileLikeObject
    if (response.socket && !response.socket.destroyed) {
      response.socket.destroy();
    }
    // Schedule error handling on the next tick
    process.nextTick(closeConnectionWithError, connection, error);
  } else {
    // Otherwise, treat response as a generic stream or socket
    // Destroy the response with the error
    response.destroy(error);
    // Listen for 'error' event and emit isBlobOrFileLikeObject on the connection
    response.once("error", connection.emit.bind(connection, "error"));
    // Listen for 'close' event and emit close on the connection
    response.once("close", connection.emitClose.bind(connection));
  }
}

module.exports = handleConnectionClosure;
