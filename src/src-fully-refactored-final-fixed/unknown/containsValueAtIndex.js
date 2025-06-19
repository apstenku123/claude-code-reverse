/**
 * Checks if a given value exists in a collection (array or string) starting from a specific index.
 * Handles negative indices, type coercion, and supports both array-like and string-like objects.
 *
 * @param {Array|string} collection - The array or string to search within.
 * @param {*} searchValue - The value to search for in the collection.
 * @param {number} [startIndex=0] - The index to start searching from. Negative values count from the end.
 * @param {boolean} [isGuard=false] - Used internally to determine if startIndex should be ignored.
 * @returns {boolean} True if the value is found in the collection at or after the start index, false otherwise.
 */
function containsValueAtIndex(collection, searchValue, startIndex, isGuard) {
  // Ensure collection is array-like or string-like
  const normalizedCollection = isArrayLike(collection) ? collection : toArray(collection);
  // If startIndex is provided and isGuard is not set, normalize startIndex; otherwise, default to 0
  const normalizedStartIndex = startIndex && !isGuard ? toInteger(startIndex) : 0;
  const collectionLength = normalizedCollection.length;

  // Handle negative startIndex: count from the end
  let searchIndex = normalizedStartIndex;
  if (searchIndex < 0) {
    searchIndex = Math.max(collectionLength + searchIndex, 0);
  }

  // If collection is a string, use indexOf directly
  if (isString(normalizedCollection)) {
    return searchIndex <= collectionLength && normalizedCollection.indexOf(searchValue, searchIndex) > -1;
  }

  // For array-like collections, use a custom indexOf implementation
  return !!collectionLength && arrayIndexOf(normalizedCollection, searchValue, searchIndex) > -1;
}

module.exports = containsValueAtIndex;
