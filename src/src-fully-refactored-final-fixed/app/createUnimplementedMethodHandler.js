/**
 * Creates a handler function for an unimplemented driver method.
 * When invoked, this handler returns a rejected Promise with a descriptive error message,
 * and invokes a callback (if provided as the last argument) with the rejected Promise.
 *
 * @param {string} methodName - The name of the method that is not implemented by the current driver.
 * @returns {Function} a function that, when called, returns a rejected Promise and invokes the callback if provided.
 */
function createUnimplementedMethodHandler(methodName) {
  return function (...args) {
    // Create an error indicating the method is not implemented
    const error = new Error(`Method ${methodName} is not implemented by the current driver`);
    // Create a rejected Promise with the error
    const rejectedPromise = C.reject(error);
    // If the last argument is a callback, invoke renderToolUseConfirmationDialog with the rejected promise and the callback
    const maybeCallback = args[args.length - 1];
    renderToolUseConfirmationDialog(rejectedPromise, maybeCallback);
    // Return the rejected promise
    return rejectedPromise;
  };
}

module.exports = createUnimplementedMethodHandler;