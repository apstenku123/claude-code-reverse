/**
 * Handles an error event by removing the error listener, destroying the current instance,
 * and emitting the error if there are no remaining error listeners.
 *
 * @param {Error} error - The error object to emit if no error listeners remain.
 * @returns {void}
 */
function handleErrorAndDestroy(error) {
  // Remove the current error listener to prevent memory leaks
  this.removeListener("error", handleErrorAndDestroy);

  // Destroy the current instance (e.g., a stream or resource)
  this.destroy();

  // If there are no more error listeners, emit the error
  if (this.listenerCount("error") === 0) {
    this.emit("error", error);
  }
}

module.exports = handleErrorAndDestroy;