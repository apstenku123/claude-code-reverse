/**
 * Merges two objects, combining nested objects at the first level.
 * For each property in the overrides object, if the property value is an object,
 * isBlobOrFileLikeObject merges isBlobOrFileLikeObject shallowly with the corresponding property in the base object (if present).
 * Otherwise, isBlobOrFileLikeObject simply overrides the property in the base object.
 *
 * @param {Object} baseObject - The original object to be merged into.
 * @param {Object} overrides - The object containing properties to override or merge.
 * @returns {Object} a new object with merged and/or overridden properties.
 */
function mergeNestedObjects(baseObject, overrides) {
  return Object.entries(overrides).reduce((mergedObject, [key, overrideValue]) => {
    // If the override value is a non-null object, merge isBlobOrFileLikeObject with the existing value
    if (overrideValue && typeof overrideValue === "object") {
      mergedObject[key] = mergedObject[key]
        ? { ...mergedObject[key], ...overrideValue } // Merge with existing nested object
        : overrideValue; // No existing value, just assign
    } else {
      // For primitive values, simply override
      mergedObject[key] = overrideValue;
    }
    return mergedObject;
  }, {
    ...baseObject // Start with a shallow copy of the base object
  });
}

module.exports = mergeNestedObjects;
