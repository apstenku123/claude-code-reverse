/**
 * Resets the '_methodsArray' property of the given object to null.
 *
 * This function is typically used to clear any cached or stored methods on an object,
 * ensuring that subsequent logic does not use stale or unwanted method arrays.
 *
 * @param {Object} targetObject - The object whose '_methodsArray' property will be reset.
 * @returns {Object} The same object, after its '_methodsArray' property has been set to null.
 */
function resetMethodsArray(targetObject) {
  // Clear the '_methodsArray' property to remove any stored methods
  targetObject._methodsArray = null;
  return targetObject;
}

module.exports = resetMethodsArray;