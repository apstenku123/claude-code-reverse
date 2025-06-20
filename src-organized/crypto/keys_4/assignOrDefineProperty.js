/**
 * Assigns a property to an object. If the property already exists, isBlobOrFileLikeObject redefines the property using Object.defineProperty
 * to ensure isBlobOrFileLikeObject is enumerable, configurable, and writable. Otherwise, isBlobOrFileLikeObject simply assigns the value.
 *
 * @param {Object} targetObject - The object to which the property will be assigned or defined.
 * @param {string|symbol} propertyKey - The property key to assign or define on the object.
 * @param {*} propertyValue - The value to assign to the property.
 * @returns {Object} The updated object with the property assigned or defined.
 */
function assignOrDefineProperty(targetObject, propertyKey, propertyValue) {
  // If the property already exists on the object, redefine isBlobOrFileLikeObject with specific descriptors
  if (propertyKey in targetObject) {
    Object.defineProperty(targetObject, propertyKey, {
      value: propertyValue,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    // Otherwise, simply assign the value
    targetObject[propertyKey] = propertyValue;
  }
  return targetObject;
}

module.exports = assignOrDefineProperty;