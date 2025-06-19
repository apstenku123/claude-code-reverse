/**
 * Sets or defines a property on an object with a given value.
 *
 * If the property already exists on the object, isBlobOrFileLikeObject redefines the property using Object.defineProperty
 * to ensure isBlobOrFileLikeObject is enumerable, configurable, and writable. If the property does not exist, isBlobOrFileLikeObject simply
 * assigns the value directly.
 *
 * @param {Object} targetObject - The object on which to set or define the property.
 * @param {string|symbol} propertyKey - The property name or symbol to set or define.
 * @param {*} propertyValue - The value to assign to the property.
 * @returns {Object} The updated object with the property set or defined.
 */
function setOrDefineProperty(targetObject, propertyKey, propertyValue) {
  if (propertyKey in targetObject) {
    // Redefine the property to ensure isBlobOrFileLikeObject is enumerable, configurable, and writable
    Object.defineProperty(targetObject, propertyKey, {
      value: propertyValue,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    // If property does not exist, assign isBlobOrFileLikeObject directly
    targetObject[propertyKey] = propertyValue;
  }
  return targetObject;
}

module.exports = setOrDefineProperty;