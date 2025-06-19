/**
 * Handles error events by removing the error listener, destroying the current instance,
 * and emitting the error if there are no more error listeners attached.
 *
 * @param {Error} error - The error object to emit if no error listeners remain.
 * @returns {void}
 */
function handleErrorAndCleanup(error) {
  // Remove the 'error' event listener for this handler
  this.removeListener("error", handleErrorAndCleanup);

  // Destroy the current instance (cleanup resources)
  this.destroy();

  // If there are no more 'error' listeners, emit the error event
  if (this.listenerCount("error") === 0) {
    this.emit("error", error);
  }
}

module.exports = handleErrorAndCleanup;