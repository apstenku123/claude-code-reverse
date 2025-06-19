/**
 * Creates a shallow clone of the given object, copying array values to new arrays.
 * Non-array values are copied by reference. This prevents accidental mutation of array properties.
 *
 * @param {Object} sourceObject - The object to clone. All own enumerable properties will be copied.
 * @returns {Object} a new object with the same keys as sourceObject. Array values are shallow-copied.
 */
function cloneObjectWithArrayCopies(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, propertyKey) => {
    const propertyValue = sourceObject[propertyKey];
    // If the property value is an array, create a shallow copy of the array
    // Otherwise, copy the value as-is (by reference for objects, by value for primitives)
    return {
      ...clonedObject,
      [propertyKey]: Array.isArray(propertyValue) ? [...propertyValue] : propertyValue
    };
  }, {});
}

module.exports = cloneObjectWithArrayCopies;