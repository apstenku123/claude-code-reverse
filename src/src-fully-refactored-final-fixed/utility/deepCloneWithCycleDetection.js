/**
 * Deeply clones a value, handling objects and arrays, and safely managing circular references.
 *
 * @param {*} value - The value to be deeply cloned.
 * @returns {*} a deep clone of the input value, with circular references preserved.
 */
function deepCloneWithCycleDetection(value) {
  // Tracks objects already visited to handle circular references
  const visitedObjects = new Array(10);

  /**
   * Internal recursive function to perform the deep clone.
   * @param {*} currentValue - The current value being cloned.
   * @param {number} depth - The current recursion depth, used as an index in visitedObjects.
   * @returns {*} The deep-cloned value.
   */
  function cloneRecursive(currentValue, depth) {
    // Check if currentValue is a non-null object
    if (isNonNullObject(currentValue)) {
      // Prevent infinite recursion on circular references
      if (visitedObjects.indexOf(currentValue) >= 0) {
        return;
      }
      // Only clone objects that do not have a toJSON method
      if (!("toJSON" in currentValue)) {
        // Mark this object as visited at the current depth
        visitedObjects[depth] = currentValue;
        // Prepare the clone: array or object
        const clone = isArrayLike(currentValue) ? [] : {};
        // Iterate over properties (or array elements) and clone recursively
        iterateCollection(currentValue, (propertyValue, propertyKey) => {
          const clonedProperty = cloneRecursive(propertyValue, depth + 1);
          // Only assign if the cloned property is not considered a circular reference
          if (!isCircular(clonedProperty)) {
            clone[propertyKey] = clonedProperty;
          }
        });
        // Unmark this object at the current depth
        visitedObjects[depth] = undefined;
        return clone;
      }
    }
    // For primitives or objects with toJSON, return as-is
    return currentValue;
  }

  return cloneRecursive(value, 0);
}

module.exports = deepCloneWithCycleDetection;
