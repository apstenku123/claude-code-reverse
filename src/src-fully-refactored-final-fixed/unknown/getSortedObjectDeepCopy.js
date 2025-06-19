/**
 * Recursively creates a deep copy of an object with its keys sorted alphabetically at each level.
 * If a maximum depth is specified, the recursion will stop after that many levels.
 *
 * @param {Object} sourceObject - The object to be deeply copied and sorted.
 * @param {number} [maxDepth] - The maximum depth to recurse. If 0, only the top level is copied. If undefined/null, unlimited depth.
 * @returns {Object|null} a new object with sorted keys, or null if the input is null or undefined.
 */
function getSortedObjectDeepCopy(sourceObject, maxDepth) {
  if (sourceObject == null) return null;

  // Get all own property keys and sort them alphabetically
  const sortedKeys = Object.keys(sourceObject).sort();
  const sortedObject = {};

  sortedKeys.forEach(key => {
    const value = sourceObject[key];
    // If maxDepth is 0 or value is not an object, copy as is
    if (maxDepth === 0 || fH9._typeOf(value) !== "object") {
      sortedObject[key] = value;
      return;
    }
    // Recursively sort nested objects, decreasing maxDepth if specified
    sortedObject[key] = QCA._getSortedObject(
      value,
      maxDepth != null ? maxDepth - 1 : maxDepth
    );
  });

  return sortedObject;
}

module.exports = getSortedObjectDeepCopy;