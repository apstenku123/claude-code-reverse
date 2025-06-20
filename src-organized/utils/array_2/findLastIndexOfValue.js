/**
 * Finds the last index of a value in an array-like object using a custom equality check.
 *
 * @param {Array} array - The array or array-like object to search.
 * @param {*} value - The value to search for.
 * @returns {number} The last index at which the value is found, or -1 if not found.
 */
function findLastIndexOfValue(array, value) {
  // Get the length of the array, treating null/undefined as length 0
  const arrayLength = array == null ? 0 : array.length;

  if (arrayLength) {
    // Find the index after the last occurrence of value (getUniqueOrFallback returns index + 1)
    const lastIndex = getUniqueOrFallback(array, value, true) - 1;
    // Check if the found element is equal to the value using custom equality
    if (H9(array[lastIndex], value)) {
      return lastIndex;
    }
  }
  // Return -1 if value is not found
  return -1;
}

module.exports = findLastIndexOfValue;