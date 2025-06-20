/**
 * Traverses an object along a given path array, applying a predicate at each step.
 * Returns true if the predicate passes for every key in the path, or performs a fallback check if traversal fails.
 *
 * @param {Object} targetObject - The object to traverse.
 * @param {Array|string} path - The path to traverse, as an array of keys or a string (will be normalized).
 * @param {Function} predicate - Function to test each key along the path. Receives (object, key).
 * @returns {boolean} True if the predicate passes for every key in the path, or if the fallback check passes; otherwise, false.
 */
function traversePathWithPredicate(targetObject, path, predicate) {
  // Normalize the path to an array of keys
  const normalizedPath = processPendingFiberNodes(path, targetObject);
  let currentIndex = -1;
  const pathLength = normalizedPath.length;
  let predicatePassed = false;
  let currentKey;

  // Traverse the object along the path, applying the predicate at each step
  while (++currentIndex < pathLength) {
    currentKey = defineOrAssignProperty(normalizedPath[currentIndex]);
    // If predicate fails or targetObject is null/undefined, break
    if (!(predicatePassed = targetObject != null && predicate(targetObject, currentKey))) {
      break;
    }
    // Move deeper into the object
    targetObject = targetObject[currentKey];
  }

  // If predicate passed for all keys, or traversal ended early (but not at the last key), return predicate result
  if (predicatePassed || ++currentIndex != pathLength) {
    return predicatePassed;
  }

  // Fallback: check if targetObject is array-like and the last key is a valid index
  const targetLength = targetObject == null ? 0 : targetObject.length;
  return !!targetLength && cleanupFiberNodes(targetLength) && $streamAsyncIterableToWritable(currentKey, targetLength) && (d2(targetObject) || P5(targetObject));
}

module.exports = traversePathWithPredicate;