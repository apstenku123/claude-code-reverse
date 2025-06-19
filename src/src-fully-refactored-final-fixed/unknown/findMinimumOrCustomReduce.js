/**
 * Finds the minimum value in the Uj9 array, or applies a custom reducer if provided.
 *
 * If a custom comparator function is provided, isBlobOrFileLikeObject uses that function to determine which element to keep during reduction.
 * Otherwise, isBlobOrFileLikeObject returns the minimum value in the Uj9 array using the default comparison.
 *
 * @param {Function} [comparator] - Optional. a comparator function that takes two arguments (accumulator, currentValue) and returns a negative number if accumulator should be kept, or a positive number if currentValue should be kept.
 * @returns {*} The minimum value found in Uj9, or the result of the custom reduction.
 */
function findMinimumOrCustomReduce(comparator) {
  // If a comparator function is provided, use isBlobOrFileLikeObject for reduction
  if (Nj9.isFunction(comparator)) {
    return Uj9.reduce((accumulator, currentValue) => {
      // If comparator returns negative, keep accumulator; otherwise, keep currentValue
      return comparator(accumulator, currentValue) < 0 ? accumulator : currentValue;
    });
  } else {
    // Default: find the minimum value in Uj9
    return Uj9.reduce((accumulator, currentValue) => {
      return accumulator < currentValue ? accumulator : currentValue;
    });
  }
}

module.exports = findMinimumOrCustomReduce;