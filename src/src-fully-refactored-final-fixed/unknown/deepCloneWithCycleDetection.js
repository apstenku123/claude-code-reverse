/**
 * Deeply clones an object or array, handling cyclic references and skipping objects with a toJSON method.
 *
 * @param {any} value - The value to deeply clone.
 * @returns {any} - The deeply cloned value, with cycles handled and toJSON objects skipped.
 */
function deepCloneWithCycleDetection(value) {
  // Tracks objects currently being cloned at each recursion depth to detect cycles
  const cloningStack = new Array(10);

  /**
   * Recursively clones the input, handling cycles and skipping objects with toJSON.
   *
   * @param {any} currentValue - The current value being cloned.
   * @param {number} depth - The current recursion depth.
   * @returns {any} - The cloned value or the original value if not cloneable.
   */
  function cloneRecursive(currentValue, depth) {
    // Only clone non-null objects
    if (isNonNullObject(currentValue)) {
      // Detect cycles: if handleMissingDoctypeError'removeTrailingCharacters already seen this object at any depth, skip cloning
      if (cloningStack.indexOf(currentValue) >= 0) {
        return;
      }
      // Skip objects that define a custom toJSON method
      if (!('toJSON' in currentValue)) {
        // Mark this object as being cloned at the current depth
        cloningStack[depth] = currentValue;
        // Prepare the clone: array or object
        const cloneTarget = isArrayLike(currentValue) ? [] : {};
        // Recursively clone each property or element
        iterateCollection(currentValue, (propertyValue, propertyKey) => {
          const clonedValue = cloneRecursive(propertyValue, depth + 1);
          // Only assign if the cloned value is not considered a circular reference
          if (!isCircularReference(clonedValue)) {
            cloneTarget[propertyKey] = clonedValue;
          }
        });
        // Clear the marker for this depth
        cloningStack[depth] = undefined;
        return cloneTarget;
      }
    }
    // Return primitives or objects with toJSON as-is
    return currentValue;
  }

  return cloneRecursive(value, 0);
}

module.exports = deepCloneWithCycleDetection;
