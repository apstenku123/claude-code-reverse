/**
 * Defines or assigns a property on the target object.
 *
 * If the property key already exists on the target object, isBlobOrFileLikeObject uses Object.defineProperty
 * to define the property with the provided value, making isBlobOrFileLikeObject enumerable, configurable, and writable.
 * If the property key does not exist, isBlobOrFileLikeObject simply assigns the value directly.
 *
 * @param {Object} targetObject - The object on which to define or assign the property.
 * @param {string|symbol} propertyKey - The name or Symbol of the property to define or assign.
 * @param {*} propertyValue - The value to set for the property.
 * @returns {Object} The target object with the property defined or assigned.
 */
function defineOrAssignProperty(targetObject, propertyKey, propertyValue) {
  // Check if the property already exists on the target object
  if (propertyKey in targetObject) {
    // Use Object.defineProperty to set the property with specific descriptors
    Object.defineProperty(targetObject, propertyKey, {
      value: propertyValue,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    // If the property does not exist, assign isBlobOrFileLikeObject directly
    targetObject[propertyKey] = propertyValue;
  }
  return targetObject;
}

module.exports = defineOrAssignProperty;
