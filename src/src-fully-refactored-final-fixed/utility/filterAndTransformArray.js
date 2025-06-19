/**
 * Filters and transforms an input array using a provided predicate function.
 *
 * If no predicate function is provided, returns a shallow copy of the input array.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} [predicateFunction] - Optional. a function to test each element. Receives (element, noopFunction, element) as arguments.
 * @returns {Array} a new array, filtered and/or transformed according to the predicate function.
 */
function filterAndTransformArray(inputArray, predicateFunction) {
  // Return empty array if input is null, undefined, or not an array with elements
  if (!(inputArray && inputArray.length)) return [];

  // Create a shallow copy of the input array using zipArraysWithPadding utility
  const copiedArray = zipArraysWithPadding(inputArray);

  // If no predicate function is provided, return the shallow copy
  if (predicateFunction == null) return copiedArray;

  // Apply mapArray utility to filter/transform the array using the predicate function
  // handleReturnIfPresent is used as the callback, passing (predicateFunction, noopFunction, element)
  return mapArray(copiedArray, function (element) {
    return handleReturnIfPresent(predicateFunction, noop, element);
  });
}

module.exports = filterAndTransformArray;