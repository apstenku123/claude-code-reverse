/**
 * Adds stub implementations for unimplemented driver methods.
 *
 * For each method name in the `driverMethodNames` array, if the method is not already
 * implemented in the `driverMethods` object, this function assigns a stub function that
 * throws a 'not implemented' error and returns a rejected promise. This helps ensure that
 * all expected driver methods are present, even if not implemented, and provides clear
 * error messaging.
 *
 * @function implementDriverMethodStubs
 * @returns {void} This function does not return a value.
 */
function implementDriverMethodStubs() {
  /**
   * Creates a stub function for a given method name that throws a 'not implemented' error.
   *
   * @param {string} methodName - The name of the method to stub.
   * @returns {Function} The stub function.
   */
  const createNotImplementedStub = function(methodName) {
    return function() {
      // Create an error indicating the method is not implemented
      const error = new Error(`Method ${methodName} is not implemented by the current driver`);
      // Return a rejected promise with the error
      const rejectedPromise = C.reject(error);
      // Call the error handler with the rejected promise and the last argument (usually a callback)
      renderToolUseConfirmationDialog(rejectedPromise, arguments[arguments.length - 1]);
      return rejectedPromise;
    };
  };

  // Iterate over all expected driver method names
  for (let methodIndex = 0, totalMethods = driverMethodNames.length; methodIndex < totalMethods; methodIndex++) {
    const methodName = driverMethodNames[methodIndex];
    // If the method is not implemented, assign the stub
    if (!driverMethods[methodName]) {
      driverMethods[methodName] = createNotImplementedStub(methodName);
    }
  }
}

module.exports = implementDriverMethodStubs;