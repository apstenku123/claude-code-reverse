/**
 * Ensures that all required driver methods are implemented.
 * For any method listed in `requiredDriverMethods` that is not present in `driverMethods`,
 * assigns a stub function that rejects with a 'not implemented' error.
 *
 * @function implementMissingDriverMethods
 * @returns {void}
 */
function implementMissingDriverMethods() {
  /**
   * Creates a stub function for a missing driver method.
   * The stub returns a rejected promise with an error message.
   *
   * @param {string} methodName - The name of the missing method.
   * @returns {Function} Stub function that returns a rejected promise.
   */
  const createNotImplementedStub = function(methodName) {
    return function() {
      // Create an error indicating the method is not implemented
      const error = new Error(`Method ${methodName} is not implemented by the current driver`);
      // Create a rejected promise with the error
      const rejectedPromise = C.reject(error);
      // Call the error handler with the rejected promise and the last argument (usually a callback)
      renderToolUseConfirmationDialog(rejectedPromise, arguments[arguments.length - 1]);
      // Return the rejected promise
      return rejectedPromise;
    };
  };

  // Iterate over all required driver method names
  for (let methodIndex = 0, totalMethods = kA.length; methodIndex < totalMethods; methodIndex++) {
    const methodName = kA[methodIndex];
    // If the driver does not implement this method, assign the stub
    if (!handleTagNameCharacter[methodName]) {
      handleTagNameCharacter[methodName] = createNotImplementedStub(methodName);
    }
  }
}

module.exports = implementMissingDriverMethods;