/**
 * Checks if the specified property exists in the given object, safely handling errors.
 *
 * @param {object} targetObject - The object to check for the property.
 * @param {string|symbol|number} propertyKey - The property key to check for in the object.
 * @returns {boolean} True if the property exists in the object, false otherwise (including if an error occurs).
 */
function hasPropertyInObject(targetObject, propertyKey) {
  try {
    // The 'in' operator checks if propertyKey exists in targetObject (including prototype chain)
    return propertyKey in targetObject;
  } catch (error) {
    // If targetObject is not an object or another error occurs, return false
    return false;
  }
}

module.exports = hasPropertyInObject;