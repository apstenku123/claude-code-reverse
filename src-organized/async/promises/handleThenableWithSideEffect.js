/**
 * Executes a side effect after resolving a value, handling both thenable and non-thenable cases.
 *
 * If the input is a thenable (Promise-like), attaches handlers to execute the side effect after resolution or rejection.
 * If not, executes the side effect immediately and returns the value.
 *
 * @param {any} valueOrThenable - The value or thenable (Promise-like) to process.
 * @param {Function} errorHandler - Function to call with the error if the thenable is rejected.
 * @param {Function} sideEffect - Function to execute as a side effect after resolution/rejection.
 * @returns {any} The resolved value, or a thenable that resolves/rejects after the side effect.
 */
function handleThenableWithSideEffect(valueOrThenable, errorHandler, sideEffect) {
  // Check if the input is a thenable (Promise-like)
  if (Zt2.isThenable(valueOrThenable)) {
    return valueOrThenable.then(
      resolvedValue => {
        sideEffect(); // Execute side effect after successful resolution
        return resolvedValue;
      },
      error => {
        // Call error handler, then execute side effect, then rethrow error
        errorHandler(error);
        sideEffect();
        throw error;
      }
    );
  }
  // If not a thenable, execute side effect immediately and return the value
  sideEffect();
  return valueOrThenable;
}

module.exports = handleThenableWithSideEffect;