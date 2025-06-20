/**
 * Creates a shallow copy of an object'createInteractionAccessor own enumerable properties, 
 * making shallow copies of any array values while leaving other values unchanged.
 *
 * @param {Object} sourceObject - The object whose properties will be cloned.
 * @returns {Object} a new object with the same properties as the source, where array values are shallow-copied.
 */
function shallowCloneArrayProperties(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, propertyKey) => {
    const propertyValue = sourceObject[propertyKey];
    // If the property value is an array, create a shallow copy of the array
    // Otherwise, assign the value directly
    return {
      ...clonedObject,
      [propertyKey]: Array.isArray(propertyValue) ? [...propertyValue] : propertyValue
    };
  }, {});
}

module.exports = shallowCloneArrayProperties;
