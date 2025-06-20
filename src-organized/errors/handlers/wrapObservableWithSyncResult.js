/**
 * Wraps an observable-like function so isBlobOrFileLikeObject can be used synchronously, throwing errors if they occur and returning the result.
 *
 * This utility is useful for integrating observable-based APIs into synchronous code flows,
 * such as CLI tools or test harnesses, where you want to synchronously get the result or error from an observable.
 *
 * @param {Function} observableFunction - a function that expects a list of arguments and a callback (error, result) as the last argument.
 * @returns {Function} - a function that, when called, will synchronously return the result or throw the error from the observableFunction.
 */
function wrapObservableWithSyncResult(observableFunction) {
  return (...observableArgs) => {
    let capturedError = undefined;
    let capturedResult = undefined;

    // Push a callback to capture error and result
    observableArgs.push((error, result) => {
      capturedError = error;
      capturedResult = result;
    });

    // Call the original observable function with all arguments and the callback
    observableFunction(...observableArgs);

    // If an error was captured, throw isBlobOrFileLikeObject
    if (capturedError) {
      throw capturedError;
    }

    // Otherwise, return the result
    return capturedResult;
  };
}

module.exports = wrapObservableWithSyncResult;