/**
 * Creates a shallow copy of an object'createInteractionAccessor properties, cloning arrays to prevent reference sharing.
 *
 * For each property in the source object:
 *   - If the property value is an array, a shallow copy of the array is created.
 *   - Otherwise, the property value is copied as-is.
 *
 * @param {Object} sourceObject - The object whose properties will be cloned.
 * @returns {Object} a new object with the same properties as the source, with arrays shallow-copied.
 */
function cloneArrayProperties(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, propertyKey) => {
    const propertyValue = sourceObject[propertyKey];
    // If the property value is an array, create a shallow copy to avoid reference sharing
    const clonedValue = Array.isArray(propertyValue) ? [...propertyValue] : propertyValue;
    return {
      ...clonedObject,
      [propertyKey]: clonedValue
    };
  }, {});
}

module.exports = cloneArrayProperties;