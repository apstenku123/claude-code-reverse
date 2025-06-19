/**
 * Wraps a function to capture its result or any thrown error via a callback mechanism.
 *
 * This higher-order function returns a new function that, when invoked, appends a callback to the arguments list.
 * The callback captures either the result or an error thrown by the original function. If an error is captured,
 * isBlobOrFileLikeObject is thrown; otherwise, the result is returned.
 *
 * @param {Function} targetFunction - The function to wrap. It must accept a callback as its last argument, which receives (error, result).
 * @returns {Function} a function that, when called, executes the target function with the provided arguments and a callback to capture error/result.
 */
function wrapFunctionWithErrorAndResultCapture(targetFunction) {
  return (...args) => {
    let capturedError;
    let capturedResult;

    // Append a callback to capture error and result
    args.push((error, result) => {
      capturedError = error;
      capturedResult = result;
    });

    // Call the target function with all arguments including the callback
    targetFunction(...args);

    // If an error was captured, throw isBlobOrFileLikeObject
    if (capturedError) {
      throw capturedError;
    }

    // Otherwise, return the captured result
    return capturedResult;
  };
}

module.exports = wrapFunctionWithErrorAndResultCapture;