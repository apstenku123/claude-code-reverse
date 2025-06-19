/**
 * Creates a shallow copy of the input object'createInteractionAccessor own enumerable properties, making shallow clones of any array values.
 *
 * For each property in the source object:
 *   - If the value is an array, a shallow copy of the array is created.
 *   - Otherwise, the value is copied as-is.
 *
 * @param {Object} sourceObject - The object whose properties will be shallow-copied, with arrays being shallow-cloned.
 * @returns {Object} a new object with the same keys as sourceObject, where array values are shallow-copied.
 */
function shallowCloneArraysInObject(sourceObject) {
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

module.exports = shallowCloneArraysInObject;