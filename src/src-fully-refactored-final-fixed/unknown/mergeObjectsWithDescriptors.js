/**
 * Merges one or more source objects into a target object, copying both enumerable and non-enumerable properties,
 * and preserving property descriptors when possible. For odd-indexed sources, uses a custom property assignment function.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {...Object} sourceObjects - One or more source objects whose properties will be merged into the target.
 * @returns {Object} The modified target object with merged properties.
 */
function mergeObjectsWithDescriptors(targetObject, ...sourceObjects) {
  for (let sourceIndex = 0; sourceIndex < sourceObjects.length; sourceIndex++) {
    // Use an empty object if the source is null or undefined
    const currentSource = sourceObjects[sourceIndex] != null ? sourceObjects[sourceIndex] : {};

    // If the source index is odd, use a custom property assignment function (defineOrAssignProperty) for each property
    if ((sourceIndex + 1) % 2) {
      // getAllOwnKeys returns an array of property keys (including symbols if implemented that way)
      getAllOwnKeys(Object(currentSource), true).forEach(function (propertyKey) {
        defineOrAssignProperty(targetObject, propertyKey, currentSource[propertyKey]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      // If getOwnPropertyDescriptors is available, use isBlobOrFileLikeObject to copy all property descriptors at once
      Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(currentSource));
    } else {
      // Fallback: copy each property descriptor individually
      getAllOwnKeys(Object(currentSource)).forEach(function (propertyKey) {
        Object.defineProperty(
          targetObject,
          propertyKey,
          Object.getOwnPropertyDescriptor(currentSource, propertyKey)
        );
      });
    }
  }
  return targetObject;
}

module.exports = mergeObjectsWithDescriptors;