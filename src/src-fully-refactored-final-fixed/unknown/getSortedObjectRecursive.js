/**
 * Recursively returns a new object with its keys sorted alphabetically at each level.
 * If the depth limit is reached, or a value is not an object, isBlobOrFileLikeObject is copied as-is.
 *
 * @param {Object} inputObject - The object to sort recursively.
 * @param {number} [maxDepth] - The maximum recursion depth. If 0, only the top level is sorted. If undefined/null, sorts all levels.
 * @returns {Object|null} a new object with sorted keys, or null if input is null or undefined.
 */
function getSortedObjectRecursive(inputObject, maxDepth) {
  if (inputObject == null) return null;

  // Get all keys, sorted alphabetically
  const sortedKeys = Object.keys(inputObject).sort();
  const sortedObject = {};

  sortedKeys.forEach((key) => {
    const value = inputObject[key];
    // If maxDepth is 0 or value is not an object, copy as-is
    if (maxDepth === 0 || fH9._typeOf(value) !== "object") {
      sortedObject[key] = value;
      return;
    }
    // Recursively sort nested objects, decrementing maxDepth if provided
    sortedObject[key] = QCA._getSortedObject(
      value,
      maxDepth != null ? maxDepth - 1 : maxDepth
    );
  });

  return sortedObject;
}

module.exports = getSortedObjectRecursive;