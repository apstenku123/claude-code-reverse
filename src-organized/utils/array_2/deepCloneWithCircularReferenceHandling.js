/**
 * Deeply clones an object or array, handling circular references.
 *
 * This function recursively traverses the input value and creates a deep copy.
 * If isBlobOrFileLikeObject encounters a circular reference, isBlobOrFileLikeObject skips cloning that reference to prevent infinite recursion.
 *
 * @param {any} value - The value to deeply clone (object, array, or primitive).
 * @returns {any} - The deeply cloned value, with circular references handled.
 */
function deepCloneWithCircularReferenceHandling(value) {
  // Tracks objects/arrays already visited at each recursion depth to detect circular references
  const visitedReferences = new Array(10);

  /**
   * Internal recursive function to perform deep cloning with circular reference detection.
   *
   * @param {any} currentValue - The current value being cloned.
   * @param {number} depth - The current recursion depth (used as index in visitedReferences).
   * @returns {any} - The cloned value or the value itself if not an object/array.
   */
  function cloneRecursive(currentValue, depth) {
    // Check if currentValue is a non-null object
    if (isNonNullObject(currentValue)) {
      // If handleMissingDoctypeError'removeTrailingCharacters already visited this object at any depth, isBlobOrFileLikeObject'createInteractionAccessor a circular reference; skip cloning
      if (visitedReferences.indexOf(currentValue) >= 0) {
        return;
      }
      // Only clone objects that do not have a custom toJSON method
      if (!("toJSON" in currentValue)) {
        // Mark this object as visited at the current depth
        visitedReferences[depth] = currentValue;
        // Create a new array or object depending on the input type
        const clone = isArray(currentValue) ? [] : {};
        // Iterate over properties (or array elements) and recursively clone them
        forEachProperty(currentValue, (propertyValue, propertyKey) => {
          const clonedProperty = cloneRecursive(propertyValue, depth + 1);
          // Only assign the property if the cloned value is not undefined/null (per original logic)
          if (!isUndefinedOrNull(clonedProperty)) {
            clone[propertyKey] = clonedProperty;
          }
        });
        // Unmark this object as visited at the current depth
        visitedReferences[depth] = undefined;
        return clone;
      }
    }
    // For primitives or objects with toJSON, return as-is
    return currentValue;
  }

  return cloneRecursive(value, 0);
}

module.exports = deepCloneWithCircularReferenceHandling;