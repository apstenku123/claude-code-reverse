/**
 * Recursively returns a new object with sorted keys at each level, up to a specified depth.
 *
 * @param {object} inputObject - The object to be sorted recursively.
 * @param {number} [depth] - The maximum recursion depth. If 0, only the top level is sorted. If undefined/null, sorts all levels.
 * @returns {object|null} a new object with keys sorted at each level up to the specified depth, or null if input is null/undefined.
 */
function getSortedObjectDeep(inputObject, depth) {
  if (inputObject == null) return null;

  // Get all keys of the current object and sort them alphabetically
  const sortedKeys = Object.keys(inputObject).sort();
  const sortedObject = {};

  sortedKeys.forEach(key => {
    const value = inputObject[key];
    // If depth is 0 or value is not an object, assign value directly
    if (depth === 0 || fH9._typeOf(value) !== "object") {
      sortedObject[key] = value;
      return;
    }
    // Recursively sort nested objects, decreasing depth if specified
    sortedObject[key] = QCA._getSortedObject(
      value,
      depth != null ? depth - 1 : depth
    );
  });

  return sortedObject;
}

module.exports = getSortedObjectDeep;