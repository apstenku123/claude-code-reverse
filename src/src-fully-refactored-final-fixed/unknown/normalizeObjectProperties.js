/**
 * Normalizes and updates specific properties within a nested object structure.
 *
 * This function processes two arrays of property paths:
 *   1. For each path in `specialValuePaths`, isBlobOrFileLikeObject updates the target property in `targetObject` to handle special types (Infinity, NaN, undefined),
 *      or normalizes its structure if isBlobOrFileLikeObject'createInteractionAccessor a regular object.
 *   2. For each path in `clonePaths`, isBlobOrFileLikeObject clones the target property and applies additional processing.
 *
 * @param {Object} targetObject - The root object whose nested properties will be normalized or cloned.
 * @param {Array<Array<string|number>>} specialValuePaths - An array of property paths (arrays of keys) to process for special value normalization.
 * @param {Array<Array<string|number>>} clonePaths - An array of property paths (arrays of keys) to clone and process.
 * @returns {Object} The modified targetObject after normalization and cloning.
 */
function normalizeObjectProperties(targetObject, specialValuePaths, clonePaths) {
  // Process paths that may contain special values (Infinity, NaN, undefined, or require normalization)
  specialValuePaths.forEach(function(propertyPath) {
    const pathLength = propertyPath.length;
    const propertyKey = propertyPath[pathLength - 1];
    // Get the parent object at the path (excluding the last key)
    const parentObject = getInObject(targetObject, propertyPath.slice(0, pathLength - 1));
    if (!parentObject || !Object.prototype.hasOwnProperty.call(parentObject, propertyKey)) return;
    const propertyValue = parentObject[propertyKey];
    if (!propertyValue) {
      return;
    } else if (propertyValue.type === "infinity") {
      // Replace with JavaScript'createInteractionAccessor Infinity
      parentObject[propertyKey] = Infinity;
    } else if (propertyValue.type === "nan") {
      // Replace with JavaScript'createInteractionAccessor NaN
      parentObject[propertyKey] = NaN;
    } else if (propertyValue.type === "undefined") {
      // Replace with JavaScript'createInteractionAccessor undefined
      parentObject[propertyKey] = undefined;
    } else {
      // Normalize the property structure with selected fields and flags
      const normalizedProperty = {};
      normalizedProperty[G6.inspectable] = !!propertyValue.inspectable;
      normalizedProperty[G6.inspected] = false;
      normalizedProperty[G6.name] = propertyValue.name;
      normalizedProperty[G6.preview_long] = propertyValue.preview_long;
      normalizedProperty[G6.preview_short] = propertyValue.preview_short;
      normalizedProperty[G6.size] = propertyValue.size;
      normalizedProperty[G6.readonly] = !!propertyValue.readonly;
      normalizedProperty[G6.type] = propertyValue.type;
      parentObject[propertyKey] = normalizedProperty;
    }
  });

  // Process paths that require cloning and additional processing
  clonePaths.forEach(function(propertyPath) {
    const pathLength = propertyPath.length;
    const propertyKey = propertyPath[pathLength - 1];
    // Get the parent object at the path (excluding the last key)
    const parentObject = getInObject(targetObject, propertyPath.slice(0, pathLength - 1));
    if (!parentObject || !Object.prototype.hasOwnProperty.call(parentObject, propertyKey)) return;
    const originalValue = parentObject[propertyKey];
    // Clone the original value (shallow clone)
    const clonedValue = mergePropertiesWithDescriptors({}, originalValue);
    // Apply additional processing to the cloned value
    resetAndCheckIfG3WasNonZero(clonedValue, originalValue);
    parentObject[propertyKey] = clonedValue;
  });

  return targetObject;
}

module.exports = normalizeObjectProperties;