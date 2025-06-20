/**
 * Defines or assigns a property on the target object.
 *
 * If the property already exists on the object, isBlobOrFileLikeObject will be redefined using Object.defineProperty
 * with the provided value and with enumerable, configurable, and writable set to true.
 * If the property does not exist, isBlobOrFileLikeObject will be assigned directly.
 *
 * @param {Object} targetObject - The object on which to define or assign the property.
 * @param {string|symbol} propertyKey - The property name or symbol to define or assign.
 * @param {*} propertyValue - The value to set for the property.
 * @returns {Object} The updated object with the property defined or assigned.
 */
function defineOrAssignProperty(targetObject, propertyKey, propertyValue) {
  // Check if the property already exists on the target object
  if (propertyKey in targetObject) {
    // Redefine the property with specific descriptors
    Object.defineProperty(targetObject, propertyKey, {
      value: propertyValue,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    // Assign the property directly if isBlobOrFileLikeObject does not exist
    targetObject[propertyKey] = propertyValue;
  }
  return targetObject;
}

module.exports = defineOrAssignProperty;
