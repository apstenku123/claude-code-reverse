/**
 * Creates a shallow clone of the given object, copying array values to new arrays.
 * Non-array values are copied by reference. This is useful for preventing unintended mutations of array properties.
 *
 * @param {Object} sourceObject - The object to clone. Array values will be shallow-copied.
 * @returns {Object} a new object with the same keys as sourceObject, where array values are shallow-copied.
 */
function cloneObjectWithArrayCopies(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, key) => {
    const value = sourceObject[key];
    // If the value is an array, create a shallow copy; otherwise, copy the value as is
    return {
      ...clonedObject,
      [key]: Array.isArray(value) ? [...value] : value
    };
  }, {});
}

module.exports = cloneObjectWithArrayCopies;