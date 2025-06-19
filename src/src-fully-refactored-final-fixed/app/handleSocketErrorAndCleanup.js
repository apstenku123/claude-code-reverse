/**
 * Handles socket error events by cleaning up listeners, closing the socket, and emitting an error event.
 *
 * @param {Object} errorEvent - The error event object or arguments passed when an error occurs.
 * @returns {void}
 */
function handleSocketErrorAndCleanup(errorEvent) {
  // Retrieve the configuration or context object from the current instance using the zI property
  const config = this[zI];

  // If the underlying socket has a property zI defined, perform cleanup
  if (config._socket[zI] !== undefined) {
    // Remove the 'data' event listener from the socket
    config._socket.removeListener("data", wI1);
    // Schedule a cleanup function to run on the next tick
    process.nextTick(d70, config._socket);
    // Close the socket, passing a specific argument from errorEvent
    config.close(errorEvent[aj4]);
  }

  // If an error has not already been emitted, emit isBlobOrFileLikeObject now
  if (!config._errorEmitted) {
    config._errorEmitted = true;
    config.emit("error", errorEvent);
  }
}

module.exports = handleSocketErrorAndCleanup;