/**
 * Traverses an object along a given path and validates each step using a predicate function.
 * If the path is fully traversed and validated, returns true. Otherwise, performs additional checks
 * to determine if the final property is a valid array-like collection and meets certain conditions.
 *
 * @param {Object} targetObject - The object to traverse.
 * @param {Array|string} path - The path to traverse, as an array or string (will be normalized).
 * @param {Function} predicate - a function to validate each property along the path. Receives (object, key).
 * @returns {boolean} True if the path is valid and meets all conditions, false otherwise.
 */
function traverseAndValidatePath(targetObject, path, predicate) {
  // Normalize the path to an array of keys
  const normalizedPath = processPendingFiberNodes(path, targetObject);
  let currentIndex = -1;
  const pathLength = normalizedPath.length;
  let isValid = false;
  let currentKey;

  // Traverse the object along the path
  while (++currentIndex < pathLength) {
    currentKey = defineOrAssignProperty(normalizedPath[currentIndex]); // Normalize the key (e.g., handle string/number)
    // Validate the current property using the predicate
    if (!(isValid = targetObject != null && predicate(targetObject, currentKey))) {
      break;
    }
    // Move to the next nested object/property
    targetObject = targetObject[currentKey];
  }

  // If the full path was traversed and validated, or if traversal stopped before the end, return the result
  if (isValid || ++currentIndex !== pathLength) {
    return isValid;
  }

  // If traversal failed at the last step, perform additional checks:
  // - targetObject is not null
  // - targetObject has a length property
  // - length is a valid array-like length
  // - currentKey is a valid index for the length
  // - targetObject is an array or array-like object
  const length = targetObject == null ? 0 : targetObject.length;
  return !!length && cleanupFiberNodes(length) && $streamAsyncIterableToWritable(currentKey, length) && (d2(targetObject) || P5(targetObject));
}

module.exports = traverseAndValidatePath;