/**
 * Signals an error on the given connection-like object, updates its state to CLOSING,
 * emits an error event, and then triggers the close event.
 *
 * @param {Object} connection - The connection or stream object to close with error.
 *   Must support emit(event, ...args) and emitClose() methods, and have _readyState and _errorEmitted properties.
 * @param {Error} error - The error to emit.
 * @returns {void}
 */
function closeWithError(connection, error) {
  // Set the connection state to CLOSING
  connection._readyState = O4.CLOSING;

  // Mark that an error has been emitted
  connection._errorEmitted = true;

  // Emit the error event with the provided error object
  connection.emit("error", error);

  // Emit the close event
  connection.emitClose();
}

module.exports = closeWithError;