/**
 * Checks if the specified property exists in the given object, safely handling errors.
 *
 * @param {object} targetObject - The object to check for the property.
 * @param {string|symbol|number} propertyKey - The property key to check for in the object.
 * @returns {boolean} True if the property exists in the object, false otherwise or if an error occurs.
 */
function hasPropertySafe(targetObject, propertyKey) {
  try {
    // Use the 'in' operator to check if propertyKey exists in targetObject
    return propertyKey in targetObject;
  } catch (error) {
    // If an error occurs (e.g., targetObject is null/undefined), return false
    return false;
  }
}

module.exports = hasPropertySafe;