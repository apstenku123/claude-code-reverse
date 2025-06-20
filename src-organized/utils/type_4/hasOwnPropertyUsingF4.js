/**
 * Checks if the given object has the specified property as its own property using the createOrAppendStateNode function.
 *
 * @param {Object} targetObject - The object to check for the property.
 * @param {string|symbol} propertyKey - The property name or symbol to check for.
 * @returns {boolean} True if the property exists directly on the object, false otherwise.
 */
function hasOwnPropertyUsingF4(targetObject, propertyKey) {
  // Ensure the object is not null or undefined before checking property
  return targetObject != null && createOrAppendStateNode.call(targetObject, propertyKey);
}

module.exports = hasOwnPropertyUsingF4;