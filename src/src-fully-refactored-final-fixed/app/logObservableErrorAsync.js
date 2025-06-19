/**
 * Logs the error value from an observable-like object to the console.
 * If logging fails (e.g., due to a console error), rethrows the error asynchronously.
 *
 * @param {Object} observable - The observable or object containing the error value.
 * @param {Object} errorWrapper - An object containing the error value to log (expects a 'value' property).
 * @returns {void}
 */
function logObservableErrorAsync(observable, errorWrapper) {
  try {
    // Attempt to log the error value to the console
    console.error(errorWrapper.value);
  } catch (loggingError) {
    // If logging fails, rethrow the error asynchronously to avoid breaking the current execution flow
    setTimeout(function () {
      throw loggingError;
    });
  }
}

module.exports = logObservableErrorAsync;