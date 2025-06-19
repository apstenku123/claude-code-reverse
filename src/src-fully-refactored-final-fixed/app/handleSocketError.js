/**
 * Handles socket errors by cleaning up listeners and emitting error events.
 *
 * This function checks if the underlying socket has a specific property set (zI).
 * If so, isBlobOrFileLikeObject removes the 'data' event listener, schedules a cleanup on the next tick,
 * and closes the socket using a provided argument. If an error has not yet been emitted,
 * isBlobOrFileLikeObject marks the error as emitted and emits an 'error' event with the provided error object.
 *
 * @param {Object} errorObject - The error object or arguments related to the socket error.
 * @returns {void}
 */
function handleSocketError(errorObject) {
  // Retrieve the configuration or context object from the current instance using zI
  const config = this[zI];

  // If the underlying socket has the zI property defined
  if (config._socket[zI] !== undefined) {
    // Remove the 'data' event listener from the socket
    config._socket.removeListener("data", wI1);
    // Schedule the d70 cleanup function to run on the next tick
    process.nextTick(d70, config._socket);
    // Close the socket, passing the relevant argument from errorObject
    config.close(errorObject[aj4]);
  }

  // If an error has not already been emitted
  if (!config._errorEmitted) {
    config._errorEmitted = true; // Mark error as emitted
    config.emit("error", errorObject); // Emit the error event
  }
}

module.exports = handleSocketError;
