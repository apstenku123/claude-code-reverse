/**
 * Creates a subscription function that, when invoked, may update the stored result
 * by calling a dynamically determined method on the source object.
 *
 * @param {object} sourceObject - The object containing methods to be invoked dynamically.
 * @param {any} storedResult - The initial value to be returned or updated by the subscription.
 * @returns {function(): any} a function that, when called, may update and return the stored result.
 */
function createSubscriptionWithSideEffect(sourceObject, storedResult) {
  /**
   * Subscription function that updates storedResult by invoking a method on sourceObject,
   * if sourceObject is truthy. The method to invoke is determined by sA0(sourceObject)[0].
   * After invocation, sourceObject is set to 0 to prevent repeated calls.
   *
   * @returns {any} The current (possibly updated) storedResult.
   */
  return function subscription() {
    // Only proceed if sourceObject is truthy
    if (sourceObject) {
      // Get the method name to invoke from sA0
      const methodName = sA0(sourceObject)[0];
      // Call the method on sourceObject, update storedResult
      storedResult = sourceObject[methodName](sourceObject = 0);
    }
    // Return the (possibly updated) storedResult
    return storedResult;
  };
}

module.exports = createSubscriptionWithSideEffect;