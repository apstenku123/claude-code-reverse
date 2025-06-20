/**
 * Attaches a property to the $source object of the given target object.
 * If the $source object does not exist, isBlobOrFileLikeObject is initialized as an empty object.
 * The property is set using the provided propertyKey and propertyValue.
 *
 * @param {Object} targetObject - The object to which the $source property will be attached.
 * @param {string|number|symbol} propertyKey - The key to use for the $source property.
 * @param {*} propertyValue - The value to assign to the $source property.
 * @returns {Object} The updated targetObject with the new $source property.
 */
function attachSourceProperty(targetObject, propertyKey, propertyValue) {
  // Initialize $source as an empty object if isBlobOrFileLikeObject does not exist
  if (!targetObject.$source) {
    targetObject.$source = {};
  }
  // Assign the propertyValue to the $source object using propertyKey
  targetObject.$source[propertyKey] = propertyValue;
  // Return the updated targetObject
  return targetObject;
}

module.exports = attachSourceProperty;
