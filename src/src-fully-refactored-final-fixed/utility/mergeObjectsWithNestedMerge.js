/**
 * Merges two objects, performing a shallow merge for nested objects.
 * For each property in the overrideObject, if the value is an object,
 * isBlobOrFileLikeObject merges isBlobOrFileLikeObject with the corresponding property in the baseObject (if isBlobOrFileLikeObject exists),
 * otherwise isBlobOrFileLikeObject simply overrides the value.
 *
 * @param {Object} baseObject - The original object to merge into.
 * @param {Object} overrideObject - The object whose properties will override or merge into baseObject.
 * @returns {Object} a new object with merged properties.
 */
function mergeObjectsWithNestedMerge(baseObject, overrideObject) {
  return Object.entries(overrideObject).reduce((mergedResult, [key, overrideValue]) => {
    // If the override value is a non-null object, perform a shallow merge
    if (overrideValue && typeof overrideValue === "object") {
      mergedResult[key] = mergedResult[key]
        ? { ...mergedResult[key], ...overrideValue } // Merge with existing object
        : overrideValue; // Or just assign if not present
    } else {
      // For primitives or null, simply override
      mergedResult[key] = overrideValue;
    }
    return mergedResult;
  }, {
    ...baseObject // Start with a shallow copy of the base object
  });
}

module.exports = mergeObjectsWithNestedMerge;