/**
 * Resolves a nested property path on an object, optionally invoking functions encountered along the path.
 * If a property in the path is undefined or null, a default value is returned.
 *
 * @param {Object} sourceObject - The object to resolve the property path from.
 * @param {Array|string} propertyPath - The property path to resolve. Can be an array of keys or a string.
 * @param {*} defaultValue - The value to return if the path cannot be fully resolved.
 * @returns {*} The resolved value at the end of the property path, or the default value if not found.
 */
function resolvePropertyPath(sourceObject, propertyPath, defaultValue) {
  // Normalize the property path to an array of keys
  const pathKeys = processPendingFiberNodes(propertyPath, sourceObject);
  let currentValue = sourceObject;
  let resolvedValue;
  let pathLength = pathKeys.length;

  // If the path is empty, treat as a single step with the default value
  if (pathLength === 0) {
    pathLength = 1;
    currentValue = processInteractionEntries; // 'a' in original code
  }

  for (let index = 0; index < pathLength; index++) {
    // Get the property key for this step in the path
    const propertyKey = defineOrAssignProperty(pathKeys[index]);
    // Get the value at this property, or undefined if currentValue is null/undefined
    resolvedValue = currentValue == null ? processInteractionEntries : currentValue[propertyKey];

    // If the property is undefined, break and use the default value
    if (resolvedValue === processInteractionEntries) {
      // Jump to end of loop
      index = pathLength;
      resolvedValue = defaultValue;
    }
    // If the resolved value is a function, call isBlobOrFileLikeObject with the current context
    currentValue = FD(resolvedValue) ? resolvedValue.call(currentValue) : resolvedValue;
  }

  return currentValue;
}

module.exports = resolvePropertyPath;