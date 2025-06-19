/**
 * Deeply clones an object or array, handling circular references and skipping objects with a toJSON method.
 *
 * @param {Object|Array} input - The object or array to be deeply cloned.
 * @returns {Object|Array} a deep clone of the input, with circular references handled.
 */
function deepCloneWithoutCircularReferences(input) {
  // Tracks objects already visited at each recursion depth to handle circular references
  const visitedObjects = new Array(10);

  /**
   * Internal recursive function to perform the deep clone.
   *
   * @param {*} value - The current value to clone.
   * @param {number} depth - The current recursion depth.
   * @returns {*} The cloned value.
   */
  function cloneRecursive(value, depth) {
    // Check if value is a non-null object
    if (isNonNullObject(value)) {
      // If handleMissingDoctypeError'removeTrailingCharacters already visited this object at any depth, isBlobOrFileLikeObject'createInteractionAccessor a circular reference; skip cloning
      if (visitedObjects.indexOf(value) >= 0) {
        return;
      }
      // If the object does not have a toJSON method, proceed to clone
      if (!('toJSON' in value)) {
        // Mark this object as visited at the current depth
        visitedObjects[depth] = value;
        // Prepare the clone: array or object
        const clone = isArray(value) ? [] : {};
        // Iterate over the object'createInteractionAccessor own properties
        forEachOwnProperty(value, (propertyValue, propertyKey) => {
          // Recursively clone each property
          const clonedProperty = cloneRecursive(propertyValue, depth + 1);
          // Only assign if the cloned property is not undefined
          if (!isUndefined(clonedProperty)) {
            clone[propertyKey] = clonedProperty;
          }
        });
        // Unmark this object at the current depth
        visitedObjects[depth] = undefined;
        return clone;
      }
    }
    // For primitives or objects with toJSON, return as is
    return value;
  }

  return cloneRecursive(input, 0);
}

module.exports = deepCloneWithoutCircularReferences;
