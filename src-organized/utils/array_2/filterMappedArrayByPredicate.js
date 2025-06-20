/**
 * Filters a mapped array based on a provided predicate function.
 *
 * This utility function first checks if the input array is valid and non-empty. It then maps the array using the `mapArrayFunction` (previously `zipArraysWithPadding`).
 * If no predicate is provided, isBlobOrFileLikeObject returns the mapped array as is. Otherwise, isBlobOrFileLikeObject filters the mapped array using the `filterFunction` (previously `mapArray`),
 * which applies the `predicateFunction` (previously `handleReturnIfPresent`) to each mapped item.
 *
 * @param {Array} inputArray - The array to be mapped and filtered.
 * @param {Function} [predicate] - Optional. The predicate function to apply for filtering.
 * @returns {Array} The mapped (and possibly filtered) array.
 */
function filterMappedArrayByPredicate(inputArray, predicate) {
  // Return an empty array if input is invalid or empty
  if (!(inputArray && inputArray.length)) return [];

  // Map the input array using the provided mapping function
  const mappedArray = mapArrayFunction(inputArray); // was zipArraysWithPadding(H)

  // If no predicate is provided, return the mapped array as is
  if (predicate == null) return mappedArray;

  // Otherwise, filter the mapped array using the predicate function
  return filterFunction(mappedArray, function (mappedItem) {
    // Apply the predicate function to each mapped item
    return predicateFunction(predicate, sourceObservable, mappedItem); // was handleReturnIfPresent($, a, c)
  });
}

module.exports = filterMappedArrayByPredicate;