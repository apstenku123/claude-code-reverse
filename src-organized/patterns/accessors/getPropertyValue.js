/**
 * Retrieves the value of a specified property from an object, with special handling for the '__proto__' property.
 * If the property is '__proto__', checks if the property exists directly on the object using MC1.call.
 * If so, and if rZ2 is defined, returns the value from rZ2(config, propertyName).value.
 * Otherwise, returns the value of the property directly from the object.
 *
 * @param {Object} targetObject - The object from which to retrieve the property value.
 * @param {string} propertyName - The name of the property to retrieve.
 * @returns {*} The value of the specified property, or undefined if not found.
 */
function getPropertyValue(targetObject, propertyName) {
  // Special handling for the '__proto__' property
  if (propertyName === "__proto__") {
    // Check if the property exists directly on the object
    if (!MC1.call(targetObject, propertyName)) {
      return;
    } else if (typeof rZ2 === 'function') {
      // If rZ2 is defined, use isBlobOrFileLikeObject to get the property descriptor and return its value
      return rZ2(targetObject, propertyName).value;
    }
  }
  // Default case: return the property value directly
  return targetObject[propertyName];
}

module.exports = getPropertyValue;