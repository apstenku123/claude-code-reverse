/**
 * Creates a shallow copy of the provided object.
 *
 * @param {Object} sourceObject - The object to be cloned.
 * @returns {Object} a new object with the same enumerable properties as the source object.
 */
function shallowCloneObject(sourceObject) {
  // Initialize a new empty object to hold the cloned properties
  const clonedObject = {};

  // Iterate over all enumerable properties in the source object
  for (const propertyName in sourceObject) {
    // Copy each property to the new object
    clonedObject[propertyName] = sourceObject[propertyName];
  }

  // Return the shallow-cloned object
  return clonedObject;
}

module.exports = shallowCloneObject;