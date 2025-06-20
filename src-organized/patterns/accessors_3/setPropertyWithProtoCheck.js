/**
 * Sets a property on the target object, with special handling for the '__proto__' property.
 * If the property name is '__proto__' and the global Ky function is available, uses Ky to define the property with specific descriptors.
 * Otherwise, sets the property directly on the target object.
 *
 * @param {Object} targetObject - The object on which to set the property.
 * @param {string} propertyName - The name of the property to set.
 * @param {*} propertyValue - The value to assign to the property.
 */
function setPropertyWithProtoCheck(targetObject, propertyName, propertyValue) {
  // Check if the property being set is '__proto__' and if the Ky function is available
  if (propertyName === "__proto__" && typeof Ky === "function") {
    // Use Ky to define the property with specific descriptors to avoid prototype pollution
    Ky(targetObject, propertyName, {
      configurable: true,
      enumerable: true,
      value: propertyValue,
      writable: true
    });
  } else {
    // For all other properties, set directly
    targetObject[propertyName] = propertyValue;
  }
}

module.exports = setPropertyWithProtoCheck;