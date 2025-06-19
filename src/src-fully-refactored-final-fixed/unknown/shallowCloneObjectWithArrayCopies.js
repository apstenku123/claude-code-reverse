/**
 * Creates a shallow clone of the given object, copying arrays by value (shallow copy),
 * and leaving other property types as-is. This prevents mutation of array properties
 * in the original object when modifying the clone.
 *
 * @param {Object} sourceObject - The object to clone.
 * @returns {Object} a shallow clone of the input object, with arrays shallow-copied.
 */
function shallowCloneObjectWithArrayCopies(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, propertyKey) => {
    const propertyValue = sourceObject[propertyKey];
    // If the property is an array, create a shallow copy of the array
    // Otherwise, assign the value directly
    return {
      ...clonedObject,
      [propertyKey]: Array.isArray(propertyValue) ? [...propertyValue] : propertyValue
    };
  }, {});
}

module.exports = shallowCloneObjectWithArrayCopies;