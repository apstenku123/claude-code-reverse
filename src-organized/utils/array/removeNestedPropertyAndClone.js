/**
 * Removes a nested property from an object or array, cloning the structure at each level.
 * The property to remove is specified by a path (propertyPath) and a fallbackPath, which determines
 * the property to copy before deletion. The function does not mutate the original object/array.
 *
 * @param {Object|Array} source - The original object or array to clone and modify.
 * @param {Array<string|number>} propertyPath - An array representing the path to the property to remove.
 * @param {Array<string|number>} fallbackPath - An array representing the path to the property to copy before deletion.
 * @param {number} [currentDepth=0] - Internal parameter for recursion, should not be set manually.
 * @returns {Object|Array} a new object or array with the specified property removed at the given path.
 */
function removeNestedPropertyAndClone(source, propertyPath, fallbackPath, currentDepth = 0) {
  const currentKey = propertyPath[currentDepth];

  // Clone the current level: array via slice, object via shallow copy
  const clonedSource = isArray(source) ? source.slice() : shallowCloneObject(source);

  // If handleMissingDoctypeError'removeTrailingCharacters reached the last level in the path
  if (currentDepth + 1 === propertyPath.length) {
    const fallbackKey = fallbackPath[currentDepth];
    // Copy the property at currentKey to fallbackKey
    clonedSource[fallbackKey] = clonedSource[currentKey];
    if (isArray(clonedSource)) {
      // Remove the element at currentKey (for arrays)
      clonedSource.splice(currentKey, 1);
    } else {
      // Remove the property at currentKey (for objects)
      delete clonedSource[currentKey];
    }
  } else {
    // Recurse deeper into the structure
    clonedSource[currentKey] = removeNestedPropertyAndClone(
      source[currentKey],
      propertyPath,
      fallbackPath,
      currentDepth + 1
    );
  }

  return clonedSource;
}

// Helper: Checks if a value is an array
function isArray(value) {
  return Array.isArray(value);
}

// Helper: Shallow clones an object
function shallowCloneObject(obj) {
  return Object.assign({}, obj);
}

module.exports = removeNestedPropertyAndClone;