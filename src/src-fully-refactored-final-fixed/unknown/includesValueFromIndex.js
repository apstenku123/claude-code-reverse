/**
 * Checks if a given value exists within a collection (array or string) starting from a specific index.
 * Handles negative start indices and supports both array-like and string-like collections.
 *
 * @param {Array|string} collection - The array or string to search within.
 * @param {*} valueToFind - The value or substring to search for.
 * @param {number} [startIndex=0] - The index to start searching from. Negative values count from the end.
 * @param {boolean} [isStrict=false] - If true, disables startIndex adjustment (used internally).
 * @returns {boolean} True if the value is found in the collection from the start index, false otherwise.
 */
function includesValueFromIndex(collection, valueToFind, startIndex, isStrict) {
  // Ensure collection is array-like or string-like
  const normalizedCollection = isArrayLike(collection) ? collection : toArray(collection);
  // If startIndex is provided and isStrict is false, normalize startIndex
  const normalizedStartIndex = startIndex && !isStrict ? toInteger(startIndex) : 0;
  const collectionLength = normalizedCollection.length;

  // Handle negative startIndex by counting from the end
  let searchIndex = normalizedStartIndex;
  if (searchIndex < 0) {
    searchIndex = Math.max(collectionLength + searchIndex, 0);
  }

  // If collection is a string, use indexOf directly
  if (isString(normalizedCollection)) {
    // Only search if start index is within bounds
    return searchIndex <= collectionLength && normalizedCollection.indexOf(valueToFind, searchIndex) > -1;
  }

  // For array-like collections, use custom indexOf implementation
  return !!collectionLength && arrayIndexOf(normalizedCollection, valueToFind, searchIndex) > -1;
}

// Dependency stubs (to be replaced with actual implementations)
function isArrayLike(value) { /* implementation */ }
function toArray(value) { /* implementation */ }
function toInteger(value) { /* implementation */ }
function isString(value) { /* implementation */ }
function arrayIndexOf(array, value, fromIndex) { /* implementation */ }

module.exports = includesValueFromIndex;
