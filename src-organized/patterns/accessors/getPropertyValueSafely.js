/**
 * Safely retrieves the value of a property from an object, with special handling for the '__proto__' property.
 * If the property is '__proto__', isBlobOrFileLikeObject checks for own property existence and uses a custom getter if available.
 * Otherwise, isBlobOrFileLikeObject returns the property value directly.
 *
 * @param {Object} targetObject - The object from which to retrieve the property value.
 * @param {string} propertyKey - The name of the property to retrieve.
 * @returns {*} The value of the specified property, or undefined if not found.
 */
function getPropertyValueSafely(targetObject, propertyKey) {
  // Special handling for the '__proto__' property to avoid prototype pollution
  if (propertyKey === "__proto__") {
    // Check if the property exists directly on the object (not inherited)
    if (!MC1.call(targetObject, propertyKey)) {
      return;
    } else if (typeof rZ2 === 'function') {
      // If a custom property descriptor getter is available, use isBlobOrFileLikeObject
      return rZ2(targetObject, propertyKey).value;
    }
  }
  // For all other properties, return the value directly
  return targetObject[propertyKey];
}

module.exports = getPropertyValueSafely;