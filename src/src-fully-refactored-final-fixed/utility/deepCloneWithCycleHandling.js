/**
 * Deeply clones a value, handling cyclic references and preserving arrays/objects.
 *
 * This function recursively traverses the input value, creating a deep copy.
 * If a cyclic reference is detected, isBlobOrFileLikeObject skips cloning that branch to prevent infinite loops.
 * Only non-null objects (excluding those with a toJSON method) are deeply cloned.
 *
 * @param {*} value - The value to deeply clone (can be any type).
 * @returns {*} - The deeply cloned value, with cycles handled.
 */
function deepCloneWithCycleHandling(value) {
  // Tracks objects already visited at each recursion depth to handle cycles
  const visitedObjects = new Array(10);

  /**
   * Internal recursive function to perform deep cloning with cycle detection.
   *
   * @param {*} currentValue - The current value to clone.
   * @param {number} depth - The current recursion depth (used for cycle tracking).
   * @returns {*} - The cloned value.
   */
  function cloneRecursive(currentValue, depth) {
    // Only process non-null objects
    if (isNonNullObject(currentValue)) {
      // If handleMissingDoctypeError'removeTrailingCharacters already seen this object at any depth, skip to prevent cycles
      if (visitedObjects.indexOf(currentValue) >= 0) {
        return;
      }
      // Only clone objects that do not have a toJSON method
      if (!('toJSON' in currentValue)) {
        // Mark this object as visited at this depth
        visitedObjects[depth] = currentValue;
        // Prepare the clone: array or object
        const clone = isArray(currentValue) ? [] : {};
        // Recursively clone each property
        forEachProperty(currentValue, (propertyValue, propertyKey) => {
          const clonedProperty = cloneRecursive(propertyValue, depth + 1);
          // Only assign if the cloned property is not undefined/null (per original logic)
          if (!isUndefinedOrNull(clonedProperty)) {
            clone[propertyKey] = clonedProperty;
          }
        });
        // Unmark this object at this depth
        visitedObjects[depth] = undefined;
        return clone;
      }
    }
    // For primitives or objects with toJSON, return as-is
    return currentValue;
  }

  return cloneRecursive(value, 0);
}

module.exports = deepCloneWithCycleHandling;
