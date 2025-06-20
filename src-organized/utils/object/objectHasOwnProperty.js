/**
 * Checks if the specified object has the given property as its own (not inherited) property.
 *
 * @param {Object} targetObject - The object to check for the property.
 * @param {string|symbol} propertyKey - The property name or symbol to check for.
 * @returns {boolean} True if the property exists directly on the object, false otherwise.
 */
function objectHasOwnProperty(targetObject, propertyKey) {
  // Use Object.prototype.hasOwnProperty to avoid issues if the object has its own 'hasOwnProperty' property
  return Object.prototype.hasOwnProperty.call(targetObject, propertyKey);
}

module.exports = objectHasOwnProperty;