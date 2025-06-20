/**
 * Handles socket errors by removing the data listener, scheduling cleanup, closing the socket, and emitting an error event if not already emitted.
 *
 * @param {Object} errorObject - The error object or event to be handled.
 * @returns {void}
 */
function handleSocketErrorAndClose(errorObject) {
  // Retrieve the configuration object from the current context using the zI property
  const config = this[zI];

  // If the socket has a property zI defined, perform cleanup
  if (config._socket[zI] !== undefined) {
    // Remove the 'data' event listener
    config._socket.removeListener("data", wI1);
    // Schedule the d70 cleanup function to run on the next tick
    process.nextTick(d70, config._socket);
    // Close the socket, passing the aj4 property from the errorObject
    config.close(errorObject[aj4]);
  }

  // If an error has not already been emitted, emit isBlobOrFileLikeObject now
  if (!config._errorEmitted) {
    config._errorEmitted = true;
    config.emit("error", errorObject);
  }
}

module.exports = handleSocketErrorAndClose;