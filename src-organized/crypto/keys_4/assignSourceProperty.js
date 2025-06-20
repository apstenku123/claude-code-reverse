/**
 * Assigns a value to a specific property on the `$source` object of the given target object.
 * If the `$source` property does not exist, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject as an empty object.
 *
 * @param {Object} targetObject - The object to which the source property will be assigned.
 * @param {string|number|symbol} propertyKey - The key under which the value will be stored in `$source`.
 * @param {*} propertyValue - The value to assign to the specified property key in `$source`.
 * @returns {Object} The updated target object with the assigned `$source` property.
 */
function assignSourceProperty(targetObject, propertyKey, propertyValue) {
  // Ensure the $source property exists on the target object
  if (!targetObject.$source) {
    targetObject.$source = {};
  }
  // Assign the value to the specified property key within $source
  targetObject.$source[propertyKey] = propertyValue;
  return targetObject;
}

module.exports = assignSourceProperty;
