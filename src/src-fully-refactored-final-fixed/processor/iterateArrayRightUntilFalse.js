/**
 * Iterates over an array from right to left, invoking a callback for each element.
 * Iteration stops early if the callback returns false.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callback - The function invoked per iteration. Receives (element, index, array).
 *   If the callback returns false, iteration stops immediately.
 * @returns {Array} The original array.
 */
function iterateArrayRightUntilFalse(array, callback) {
  // If array is null or undefined, treat as empty array
  const length = array == null ? 0 : array.length;
  let index = length;
  // Iterate from the last element to the first
  while (index--) {
    // If callback returns false, break the loop early
    if (callback(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = iterateArrayRightUntilFalse;