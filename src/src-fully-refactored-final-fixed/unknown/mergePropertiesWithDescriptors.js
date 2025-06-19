/**
 * Merges properties from one or more source objects into a target object, preserving property descriptors when possible.
 * For odd-indexed sources, uses a custom property assignment (defineOrAssignProperty) for each property.
 * For even-indexed sources, uses Object.defineProperties or falls back to defining each property individually with its descriptor.
 *
 * @param {Object} targetObject - The object to which properties will be assigned.
 * @param {...Object} sourceObjects - One or more source objects whose properties will be merged into the target.
 * @returns {Object} The target object after merging properties.
 */
function mergePropertiesWithDescriptors(targetObject, ...sourceObjects) {
  for (let sourceIndex = 0; sourceIndex < sourceObjects.length; sourceIndex++) {
    // Ensure the source is not null or undefined; default to an empty object
    const currentSource = sourceObjects[sourceIndex] != null ? sourceObjects[sourceIndex] : {};

    if ((sourceIndex + 1) % 2 === 1) {
      // For odd-indexed sources (1st, 3rd, ...), use custom property assignment
      // getAllOwnKeys presumably returns an array of property keys (including symbols if needed)
      getAllOwnKeys(Object(currentSource), true).forEach(function(propertyKey) {
        defineOrAssignProperty(targetObject, propertyKey, currentSource[propertyKey]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      // For even-indexed sources, use defineProperties if available
      Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(currentSource));
    } else {
      // Fallback: define each property individually with its descriptor
      getAllOwnKeys(Object(currentSource)).forEach(function(propertyKey) {
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

module.exports = mergePropertiesWithDescriptors;