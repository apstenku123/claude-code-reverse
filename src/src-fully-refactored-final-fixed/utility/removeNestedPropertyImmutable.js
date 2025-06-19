/**
 * Removes a nested property from an object or array immutably, returning a new object/array.
 *
 * @param {Object|Array} source - The source object or array to remove the property from.
 * @param {Array<string|number>} path - The path to the property to remove (as an array of keys or indices).
 * @param {Array<string|number>} clonePath - The path used for cloning (typically same as path).
 * @param {number} [depth=0] - The current recursion depth (used internally).
 * @returns {Object|Array} a new object or array with the specified property removed.
 */
function removeNestedPropertyImmutable(source, path, clonePath, depth = 0) {
  const currentKey = path[depth];
  // Clone the source at this level (array or object)
  const clonedSource = isArray(source) ? source.slice() : shallowCloneObject(source);

  // If handleMissingDoctypeError'removeTrailingCharacters reached the last key in the path
  if (depth + 1 === path.length) {
    const propertyToRemove = clonePath[depth];
    // Assign the value to be removed (for consistency with original logic)
    clonedSource[propertyToRemove] = clonedSource[currentKey];
    if (isArray(clonedSource)) {
      // Remove the element from the array
      clonedSource.splice(currentKey, 1);
    } else {
      // Remove the property from the object
      delete clonedSource[currentKey];
    }
  } else {
    // Recurse deeper into the structure
    clonedSource[currentKey] = removeNestedPropertyImmutable(
      source[currentKey],
      path,
      clonePath,
      depth + 1
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

module.exports = removeNestedPropertyImmutable;
