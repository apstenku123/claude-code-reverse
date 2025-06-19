/**
 * Creates a shallow clone of the given object, making shallow copies of array values.
 *
 * For each property in the source object, if the value is an array, a shallow copy of the array is made.
 * Otherwise, the value is copied as-is. This prevents accidental mutation of array values in the clone.
 *
 * @param {Object} sourceObject - The object to clone.
 * @returns {Object} a new object with the same properties as the source, with arrays shallow-copied.
 */
function cloneObjectWithArrayShallowCopy(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, propertyKey) => {
    const propertyValue = sourceObject[propertyKey];
    // If the property value is an array, create a shallow copy of the array
    // Otherwise, copy the value as-is
    return {
      ...clonedObject,
      [propertyKey]: Array.isArray(propertyValue) ? [...propertyValue] : propertyValue
    };
  }, {});
}

module.exports = cloneObjectWithArrayShallowCopy;