/**
 * Checks if a given property key exists directly on a provided object (not its prototype chain).
 *
 * @param {object} targetObject - The object to check for the property.
 * @param {string|symbol|number} propertyKey - The property key to check for existence on the object.
 * @returns {boolean} True if the property exists on the object, false otherwise.
 */
function hasPropertyOnObject(targetObject, propertyKey) {
  // Ensure the targetObject is not null or undefined, and check if propertyKey exists in the object
  return targetObject != null && propertyKey in Object(targetObject);
}

module.exports = hasPropertyOnObject;