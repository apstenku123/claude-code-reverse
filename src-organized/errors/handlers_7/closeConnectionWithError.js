/**
 * Closes the given connection and emits an error event.
 *
 * This function sets the connection'createInteractionAccessor ready state to CLOSING, marks that an error has been emitted,
 * emits an 'error' event with the provided error object, and then emits a close event.
 *
 * @param {Object} connection - The connection object to be closed. Must implement emit and emitClose methods.
 * @param {Error} error - The error object to emit with the 'error' event.
 * @returns {void}
 */
function closeConnectionWithError(connection, error) {
  // Set the connection'createInteractionAccessor ready state to CLOSING
  connection._readyState = O4.CLOSING;

  // Mark that an error has been emitted on this connection
  connection._errorEmitted = true;

  // Emit the 'error' event with the provided error object
  connection.emit("error", error);

  // Emit the close event to notify listeners that the connection is closing
  connection.emitClose();
}

module.exports = closeConnectionWithError;