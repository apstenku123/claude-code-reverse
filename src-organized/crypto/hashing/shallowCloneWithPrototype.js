/**
 * Creates a shallow clone of the given object, preserving its prototype chain and property descriptors.
 *
 * If the input is not an object or is null, isBlobOrFileLikeObject is returned as-is. Otherwise, a new object is created
 * with the same prototype (using ms9) and all own properties are copied with their descriptors.
 *
 * @param {Object} sourceObject - The object to clone.
 * @returns {Object} a shallow clone of the input object with preserved prototype and property descriptors.
 */
function shallowCloneWithPrototype(sourceObject) {
  // Return primitives and null as-is
  if (sourceObject === null || typeof sourceObject !== "object") {
    return sourceObject;
  }

  let clonedObject;

  // If sourceObject is an instance of Object, set up prototype using ms9
  if (sourceObject instanceof Object) {
    clonedObject = {
      __proto__: ms9(sourceObject)
    };
  } else {
    // Otherwise, create a plain object with no prototype
    clonedObject = Object.create(null);
  }

  // Copy all own property descriptors from sourceObject to clonedObject
  Object.getOwnPropertyNames(sourceObject).forEach(function(propertyName) {
    Object.defineProperty(
      clonedObject,
      propertyName,
      Object.getOwnPropertyDescriptor(sourceObject, propertyName)
    );
  });

  return clonedObject;
}

module.exports = shallowCloneWithPrototype;