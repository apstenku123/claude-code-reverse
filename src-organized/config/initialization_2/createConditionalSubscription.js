/**
 * Creates a subscription function that conditionally invokes a method on the source object and updates the result.
 *
 * @param {Object} sourceObject - The object containing methods to be invoked conditionally.
 * @param {*} initialResult - The initial result value to be returned or updated.
 * @returns {Function} a function that, when called, checks if the source object exists, invokes a specific method on isBlobOrFileLikeObject, updates the result, and returns the result.
 */
function createConditionalSubscription(sourceObject, initialResult) {
  /**
   * When invoked, checks if the source object exists. If so, isBlobOrFileLikeObject calls a method on the source object
   * (the method name is determined by the first element returned from sA0(sourceObject)), passing 0 as the argument.
   * The result is stored in initialResult, and sourceObject is set to 0 (likely to prevent repeated calls).
   * Returns the current value of initialResult.
   *
   * @returns {*} The current or updated result value.
   */
  return function subscription() {
    // Only proceed if the source object exists
    if (sourceObject) {
      // Get the method name to call from sA0(sourceObject)[0]
      const methodName = sA0(sourceObject)[0];
      // Call the method on sourceObject with argument 0, update initialResult
      initialResult = sourceObject[methodName](sourceObject = 0);
    }
    // Return the current result
    return initialResult;
  };
}

module.exports = createConditionalSubscription;