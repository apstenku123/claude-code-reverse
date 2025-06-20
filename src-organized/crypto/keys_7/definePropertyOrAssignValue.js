/**
 * Sets a property on the target object. If the property name is '__proto__' and the global 'Ky' function is available,
 * isBlobOrFileLikeObject uses 'Ky' to define the property with specific descriptors. Otherwise, isBlobOrFileLikeObject assigns the value directly.
 *
 * @param {Object} targetObject - The object on which to set the property.
 * @param {string} propertyName - The name of the property to set.
 * @param {*} propertyValue - The value to assign to the property.
 */
function definePropertyOrAssignValue(targetObject, propertyName, propertyValue) {
  // Check if the property is '__proto__' and the Ky function is available
  if (propertyName === "__proto__" && typeof Ky === 'function') {
    // Use Ky to define the property with specific descriptors
    Ky(targetObject, propertyName, {
      configurable: true,
      enumerable: true,
      value: propertyValue,
      writable: true
    });
  } else {
    // Directly assign the value to the property
    targetObject[propertyName] = propertyValue;
  }
}

module.exports = definePropertyOrAssignValue;