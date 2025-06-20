/**
 * Recursively returns a new object with its keys sorted alphabetically.
 * If a depth limit is provided, only recurses up to that depth.
 *
 * @param {Object} inputObject - The object to be sorted.
 * @param {number} [maxDepth] - Optional. The maximum depth to recurse. If 0, only sorts the top-level keys.
 * @returns {Object|null} a new object with sorted keys, or null if inputObject is null or undefined.
 */
function getSortedObjectWithDepth(inputObject, maxDepth) {
  if (inputObject == null) return null;

  // Get all keys of the object and sort them alphabetically
  const sortedKeys = Object.keys(inputObject).sort();
  const sortedObject = {};

  sortedKeys.forEach(key => {
    const value = inputObject[key];
    // If maxDepth is 0 or value is not an object, assign value directly
    if (maxDepth === 0 || fH9._typeOf(value) !== "object") {
      sortedObject[key] = value;
      return;
    }
    // Otherwise, recursively sort the nested object, decreasing depth if specified
    sortedObject[key] = QCA._getSortedObject(
      value,
      maxDepth != null ? maxDepth - 1 : maxDepth
    );
  });

  return sortedObject;
}

module.exports = getSortedObjectWithDepth;