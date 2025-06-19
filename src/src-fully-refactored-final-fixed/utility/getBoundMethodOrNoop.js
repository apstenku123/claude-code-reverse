/**
 * Returns a bound method from the provided object if certain conditions are met; otherwise, returns a no-operation function.
 *
 * @param {string} methodName - The name of the method to retrieve and bind from the target object.
 * @param {Object} targetObject - The object from which to retrieve the method.
 * @param {string} comparisonKey - The key used to compare values in the uW1 mapping.
 * @returns {Function} The bound method if conditions are satisfied, otherwise a noop function.
 */
function getBoundMethodOrNoop(methodName, targetObject, comparisonKey) {
  // If targetObject is falsy or the value in uW1 for methodName is greater than for comparisonKey, return noop
  if (!targetObject || uW1[methodName] > uW1[comparisonKey]) {
    return noop;
  } else {
    // Otherwise, return the specified method bound to the targetObject
    return targetObject[methodName].bind(targetObject);
  }
}

module.exports = getBoundMethodOrNoop;