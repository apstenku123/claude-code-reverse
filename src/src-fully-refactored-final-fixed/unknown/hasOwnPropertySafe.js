/**
 * Checks if the specified object has the given property as its own (not inherited) property.
 * Uses Object.prototype.hasOwnProperty.call to avoid issues with objects that may override hasOwnProperty.
 *
 * @param {Object} targetObject - The object to check for the property.
 * @param {string|symbol} propertyKey - The name or Symbol of the property to check.
 * @returns {boolean} True if the property exists directly on the object, false otherwise.
 */
function hasOwnPropertySafe(targetObject, propertyKey) {
  // Use Object.prototype.hasOwnProperty.call to safely check for own property
  return Object.prototype.hasOwnProperty.call(targetObject, propertyKey);
}

module.exports = hasOwnPropertySafe;