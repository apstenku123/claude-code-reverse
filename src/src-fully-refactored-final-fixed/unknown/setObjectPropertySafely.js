/**
 * Sets a property on an object, handling the special case for '__proto__' to avoid prototype pollution.
 * If the property name is '__proto__' and the helper function 'definePropertySafely' is available,
 * isBlobOrFileLikeObject uses that function to define the property with standard property descriptors. Otherwise, isBlobOrFileLikeObject sets the property directly.
 *
 * @param {Object} targetObject - The object on which to set the property.
 * @param {string} propertyName - The name of the property to set.
 * @param {*} propertyValue - The value to assign to the property.
 * @returns {void}
 */
function setObjectPropertySafely(targetObject, propertyName, propertyValue) {
  // Check for the special case of '__proto__' to prevent prototype pollution
  if (propertyName === "__proto__" && typeof definePropertySafely === "function") {
    // Use the helper to define the property with safe descriptors
    definePropertySafely(targetObject, propertyName, {
      configurable: true,
      enumerable: true,
      value: propertyValue,
      writable: true
    });
  } else {
    // Set the property directly for all other cases
    targetObject[propertyName] = propertyValue;
  }
}

module.exports = setObjectPropertySafely;