/**
 * Handles a value that may be a thenable (Promise-like), ensuring cleanup logic is always executed.
 *
 * If the input is a thenable, attaches handlers to call the cleanup function after resolution or rejection.
 * If not, calls the cleanup function immediately and returns the value.
 *
 * @param {any} possibleThenable - The value to check and possibly handle as a thenable (Promise-like).
 * @param {Function} errorHandler - Function to call with the error if the thenable is rejected.
 * @param {Function} cleanup - Function to call for cleanup after resolution or rejection.
 * @returns {any} The resolved value or the original value if not a thenable.
 */
function handleThenableWithCleanup(possibleThenable, errorHandler, cleanup) {
  // Check if the input is a thenable (Promise-like object)
  if (Zt2.isThenable(possibleThenable)) {
    return possibleThenable.then(
      result => {
        // On resolution, perform cleanup and return the result
        cleanup();
        return result;
      },
      error => {
        // On rejection, call error handler, perform cleanup, and rethrow the error
        errorHandler(error);
        cleanup();
        throw error;
      }
    );
  }
  // If not a thenable, perform cleanup immediately and return the value
  cleanup();
  return possibleThenable;
}

module.exports = handleThenableWithCleanup;