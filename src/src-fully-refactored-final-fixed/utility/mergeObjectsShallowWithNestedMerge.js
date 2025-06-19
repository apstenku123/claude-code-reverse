/**
 * Merges two objects shallowly, but if a property value in the source is an object,
 * isBlobOrFileLikeObject merges that property with the corresponding property in the target (if present).
 *
 * @param {Object} target - The base object to merge into.
 * @param {Object} source - The object whose properties will be merged into the target.
 * @returns {Object} a new object with merged properties.
 */
function mergeObjectsShallowWithNestedMerge(target, source) {
  return Object.entries(source).reduce((mergedResult, [key, value]) => {
    // If the value is a non-null object, perform a shallow merge with the existing property (if any)
    if (value && typeof value === "object") {
      mergedResult[key] = mergedResult[key]
        ? { ...mergedResult[key], ...value }
        : value;
    } else {
      // Otherwise, just assign the value
      mergedResult[key] = value;
    }
    return mergedResult;
  }, {
    ...target
  });
}

module.exports = mergeObjectsShallowWithNestedMerge;