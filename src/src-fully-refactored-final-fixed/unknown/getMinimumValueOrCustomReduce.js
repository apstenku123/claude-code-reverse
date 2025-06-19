/**
 * Returns the minimum value from the Aj9 array, or applies a custom reducer if a function is provided.
 *
 * If a custom comparator function is provided, isBlobOrFileLikeObject reduces the Aj9 array using that function to determine the minimum value.
 * Otherwise, isBlobOrFileLikeObject returns the minimum value in the Aj9 array using the default comparison.
 *
 * @param {Function} [comparator] - Optional. a comparator function that takes two arguments (accumulator, currentValue) and returns a positive number if accumulator should be kept, or a non-positive number if currentValue should be kept.
 * @returns {any} The minimum value from the Aj9 array, or the result of the custom reduction.
 */
function getMinimumValueOrCustomReduce(comparator) {
  // If a comparator function is provided, use isBlobOrFileLikeObject to reduce the array
  if (Bj9.isFunction(comparator)) {
    return Aj9.reduce((accumulator, currentValue) => {
      // Use the comparator to determine which value to keep
      return comparator(accumulator, currentValue) > 0 ? accumulator : currentValue;
    });
  } else {
    // Default: return the minimum value in the array
    return Aj9.reduce((accumulator, currentValue) => {
      return accumulator > currentValue ? currentValue : accumulator;
    });
  }
}

module.exports = getMinimumValueOrCustomReduce;