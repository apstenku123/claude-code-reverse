/**
 * Logs the error value from an observable-like object to the console.
 * If logging fails (e.g., due to a console error), rethrows the error asynchronously.
 *
 * @param {Object} observable - An object expected to have a 'value' property representing the error.
 * @param {Object} errorContext - The context object containing the error value to log.
 * @returns {void}
 */
function logObservableError(observable, errorContext) {
  try {
    // Attempt to log the error value to the console
    console.error(errorContext.value);
  } catch (loggingError) {
    // If logging fails, rethrow the error asynchronously to avoid breaking the call stack
    setTimeout(function () {
      throw loggingError;
    });
  }
}

module.exports = logObservableError;