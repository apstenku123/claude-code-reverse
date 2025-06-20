/**
 * Iterates over each element of the provided array, executing the callback for each item.
 * If the callback returns false at any point, iteration stops early.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callback - The function to execute for each element. Receives (element, index, array).
 *                              If the callback returns false, iteration stops.
 * @returns {Array} The original array.
 */
function forEachUntilFalse(array, callback) {
  // If array is null or undefined, treat as empty array
  const arrayLength = array == null ? 0 : array.length;
  let index = 0;
  // Iterate over the array elements
  while (index < arrayLength) {
    // If callback returns false, break the loop early
    if (callback(array[index], index, array) === false) {
      break;
    }
    index++;
  }
  // Return the original array
  return array;
}

module.exports = forEachUntilFalse;