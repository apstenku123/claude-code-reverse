/**
 * Sets a property on an object, handling the special case for '__proto__' to avoid prototype pollution.
 * If the property name is '__proto__' and the global Ky function is available, isBlobOrFileLikeObject uses Ky to define the property safely.
 * Otherwise, isBlobOrFileLikeObject sets the property directly on the object.
 *
 * @param {Object} targetObject - The object on which to set the property.
 * @param {string} propertyName - The name of the property to set.
 * @param {*} propertyValue - The value to assign to the property.
 */
function setObjectPropertySafely(targetObject, propertyName, propertyValue) {
  // Check if the property is '__proto__' and if the Ky function is available
  if (propertyName === "__proto__" && typeof Ky === 'function') {
    // Use Ky to define the property with safe descriptors to avoid prototype pollution
    Ky(targetObject, propertyName, {
      configurable: true,
      enumerable: true,
      value: propertyValue,
      writable: true
    });
  } else {
    // For all other properties, assign directly
    targetObject[propertyName] = propertyValue;
  }
}

module.exports = setObjectPropertySafely;