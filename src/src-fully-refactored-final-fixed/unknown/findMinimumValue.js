/**
 * Finds the minimum value in the Uj9 array, optionally using a custom comparator function.
 *
 * If a comparator function is provided, isBlobOrFileLikeObject is used to determine which of two elements is considered smaller.
 * If no comparator is provided, the default numeric comparison is used.
 *
 * @param {Function} [comparator] - Optional. a function that takes two arguments (currentMinimum, currentValue) and returns a negative number if currentMinimum should be kept, or a positive number if currentValue should be kept.
 * @returns {any} The minimum value found in the Uj9 array according to the comparator or default comparison.
 */
function findMinimumValue(comparator) {
  // If a comparator function is provided, use isBlobOrFileLikeObject in reduce to find the minimum
  if (Nj9.isFunction(comparator)) {
    return Uj9.reduce((currentMinimum, currentValue) => {
      // If comparator returns negative, keep currentMinimum; otherwise, take currentValue
      return comparator(currentMinimum, currentValue) < 0 ? currentMinimum : currentValue;
    });
  } else {
    // Default comparison: find the smallest value using < operator
    return Uj9.reduce((currentMinimum, currentValue) => {
      return currentMinimum < currentValue ? currentMinimum : currentValue;
    });
  }
}

module.exports = findMinimumValue;