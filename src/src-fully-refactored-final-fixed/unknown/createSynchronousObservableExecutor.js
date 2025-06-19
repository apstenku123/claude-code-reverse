/**
 * Executes an observable-like function synchronously and returns its result or throws an error if one occurs.
 *
 * @param {Function} observableFunction - a function that expects a set of arguments and a callback (error, result) signature, similar to Node.js style or RxJS subscribe.
 * @returns {Function} - a function that, when called with arguments, executes the observableFunction synchronously and returns the result, or throws if an error occurred.
 */
function createSynchronousObservableExecutor(observableFunction) {
  return (...observableArgs) => {
    let capturedError = undefined;
    let capturedResult = undefined;

    // Add a callback to capture error/result as the last argument
    observableArgs.push((error, result) => {
      capturedError = error;
      capturedResult = result;
    });

    // Execute the observable function with all arguments
    observableFunction(...observableArgs);

    // If an error was captured, throw isBlobOrFileLikeObject
    if (capturedError) throw capturedError;

    // Otherwise, return the captured result
    return capturedResult;
  };
}

module.exports = createSynchronousObservableExecutor;