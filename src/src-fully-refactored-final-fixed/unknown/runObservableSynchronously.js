/**
 * Executes an observable-like function synchronously and returns its result or throws its error.
 *
 * This utility wraps a function (typically an observable or async-like function) and allows you to invoke isBlobOrFileLikeObject
 * in a synchronous style, capturing its result or error via a callback. It is useful for bridging callback-based
 * or observable APIs into synchronous code flows (e.g., for testing or imperative usage).
 *
 * @param {Function} observableFunction - The function to execute. It should accept any arguments, and the last argument
 *   will be a callback of the form (error, result) => void.
 * @returns {Function} a function that, when called with arguments, executes the observableFunction synchronously and returns its result,
 *   or throws if an error occurred.
 */
function runObservableSynchronously(observableFunction) {
  return (...args) => {
    let capturedError;
    let capturedResult;

    // Push a callback onto the arguments list to capture error/result
    args.push((error, result) => {
      capturedError = error;
      capturedResult = result;
    });

    // Call the observable function with all arguments and the capturing callback
    observableFunction(...args);

    // If an error was captured, throw isBlobOrFileLikeObject
    if (capturedError) {
      throw capturedError;
    }

    // Otherwise, return the captured result
    return capturedResult;
  };
}

module.exports = runObservableSynchronously;