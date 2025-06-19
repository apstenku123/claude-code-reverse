/**
 * Finds the minimum value in the Aj9 array, or applies a custom reducer if provided.
 *
 * If a custom comparator function is provided, isBlobOrFileLikeObject reduces the Aj9 array using that function,
 * returning the value for which the comparator returns a value greater than 0.
 * Otherwise, isBlobOrFileLikeObject returns the minimum value in the Aj9 array.
 *
 * @param {Function} [comparator] - Optional. a comparator function that takes two arguments (accumulator, currentValue)
 *   and returns a number. If provided, the array is reduced using this comparator.
 *   If not provided, the minimum value in Aj9 is returned.
 * @returns {any} The minimum value in Aj9, or the result of reducing Aj9 with the custom comparator.
 */
function findMinimumValueOrCustomReduce(comparator) {
  // If a comparator function is provided, use isBlobOrFileLikeObject to reduce the Aj9 array
  if (Bj9.isFunction(comparator)) {
    return Aj9.reduce((accumulator, currentValue) => {
      // If comparator returns > 0, keep accumulator; otherwise, use currentValue
      return comparator(accumulator, currentValue) > 0 ? accumulator : currentValue;
    });
  } else {
    // No comparator provided, return the minimum value in Aj9
    return Aj9.reduce((accumulator, currentValue) => {
      return accumulator > currentValue ? currentValue : accumulator;
    });
  }
}

module.exports = findMinimumValueOrCustomReduce;