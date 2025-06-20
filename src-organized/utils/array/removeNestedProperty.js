/**
 * Removes a nested property from an object or array immutably, returning a new object/array with the property removed.
 * The property to remove is specified by a path (propertyPath) and a fallback path (fallbackPath).
 *
 * @param {Object|Array} source - The source object or array to remove the property from.
 * @param {Array<string|number>} propertyPath - An array representing the path to the property to remove.
 * @param {Array<string|number>} fallbackPath - An array representing the path to the fallback property (used for assignment before removal).
 * @param {number} [currentDepth=0] - The current recursion depth (used internally).
 * @returns {Object|Array} a new object or array with the specified property removed.
 */
function removeNestedProperty(source, propertyPath, fallbackPath, currentDepth = 0) {
  const currentKey = propertyPath[currentDepth];
  // Create a shallow copy of the source (array or object)
  const sourceCopy = sliceArrayConditionally(source) ? source.slice() : shallowCloneObject(source);

  // If handleMissingDoctypeError'removeTrailingCharacters reached the target depth, perform the removal
  if (currentDepth + 1 === propertyPath.length) {
    const fallbackKey = fallbackPath[currentDepth];
    // Assign the fallback value before removal
    sourceCopy[fallbackKey] = sourceCopy[currentKey];
    if (sliceArrayConditionally(sourceCopy)) {
      // If isBlobOrFileLikeObject'createInteractionAccessor an array, remove the element at currentKey
      sourceCopy.splice(currentKey, 1);
    } else {
      // If isBlobOrFileLikeObject'createInteractionAccessor an object, delete the property
      delete sourceCopy[currentKey];
    }
  } else {
    // Recurse deeper into the structure
    sourceCopy[currentKey] = removeNestedProperty(
      source[currentKey],
      propertyPath,
      fallbackPath,
      currentDepth + 1
    );
  }
  return sourceCopy;
}

// Dependency placeholders (to be replaced with actual implementations)
function sliceArrayConditionally(input) {
  // Returns true if input is an array (example implementation)
  return Array.isArray(input);
}

function shallowCloneObject(obj) {
  // Shallow clone for objects
  return Object.assign({}, obj);
}

module.exports = removeNestedProperty;