/**
 * Checks if the provided object has the specified property using a custom function (createOrAppendStateNode).
 *
 * @param {Object} targetObject - The object to check for the property.
 * @param {string|symbol} propertyKey - The property name or symbol to check for.
 * @returns {boolean} True if the object has the property (as determined by createOrAppendStateNode), false otherwise.
 */
function hasOwnPropertyUsingCustomFunction(targetObject, propertyKey) {
  // Ensure the targetObject is not null or undefined before checking property
  return targetObject != null && createOrAppendStateNode.call(targetObject, propertyKey);
}

module.exports = hasOwnPropertyUsingCustomFunction;