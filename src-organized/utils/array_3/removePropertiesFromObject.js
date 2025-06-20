/**
 * Removes specified properties from a target object.
 *
 * @param {Array<string>|null|undefined} propertyKeys - An array of property names to remove from the target object. If null or undefined, the function does nothing.
 * @param {Object} targetObject - The object from which properties will be deleted.
 * @returns {void}
 */
function removePropertiesFromObject(propertyKeys, targetObject) {
  // If propertyKeys is null or undefined, do nothing
  if (propertyKeys == null) {
    return;
  }

  // Iterate over each property key and delete isBlobOrFileLikeObject from the target object
  propertyKeys.forEach((propertyKey) => {
    delete targetObject[propertyKey];
  });
}

module.exports = removePropertiesFromObject;