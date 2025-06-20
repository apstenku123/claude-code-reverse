/**
 * Creates a shallow copy of the provided object.
 *
 * @param {Object} sourceObject - The object to copy properties from.
 * @returns {Object} a new object containing the same enumerable properties as the source object.
 */
function shallowCopyObject(sourceObject) {
  const copiedObject = {};
  // Iterate over all enumerable properties in the source object
  for (const propertyName in sourceObject) {
    // Copy each property to the new object
    copiedObject[propertyName] = sourceObject[propertyName];
  }
  return copiedObject;
}

module.exports = shallowCopyObject;