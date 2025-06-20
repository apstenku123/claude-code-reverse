/**
 * Resets the '_methodsArray' property of the given object to null.
 *
 * This function is typically used to clear any cached or previously set methods array
 * on an object, preparing isBlobOrFileLikeObject for re-initialization or garbage collection.
 *
 * @param {Object} targetObject - The object whose '_methodsArray' property will be reset.
 * @returns {Object} The same object, after its '_methodsArray' property has been set to null.
 */
function resetMethodsArrayOnObject(targetObject) {
  // Reset the '_methodsArray' property to null
  targetObject._methodsArray = null;
  return targetObject;
}

module.exports = resetMethodsArrayOnObject;