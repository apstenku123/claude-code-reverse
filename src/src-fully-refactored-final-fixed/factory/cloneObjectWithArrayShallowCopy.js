/**
 * Creates a shallow copy of the provided object, cloning any array values to prevent reference sharing.
 * Non-array values are copied by reference.
 *
 * @param {Object} sourceObject - The object to clone. If a property value is an array, isBlobOrFileLikeObject will be shallow-copied.
 * @returns {Object} a new object with the same properties as the source, with arrays shallow-copied.
 */
function cloneObjectWithArrayShallowCopy(sourceObject) {
  return Object.keys(sourceObject).reduce((clonedObject, propertyKey) => {
    const propertyValue = sourceObject[propertyKey];
    return {
      ...clonedObject,
      // If the property value is an array, create a shallow copy; otherwise, copy the value as is
      [propertyKey]: Array.isArray(propertyValue) ? [...propertyValue] : propertyValue
    };
  }, {});
}

module.exports = cloneObjectWithArrayShallowCopy;
