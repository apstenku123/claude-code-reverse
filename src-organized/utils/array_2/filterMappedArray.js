/**
 * Maps an input array using the 'zipArraysWithPadding' function and optionally filters the mapped results
 * based on a provided predicate function. If no predicate is provided, returns the mapped array.
 *
 * @param {Array} inputArray - The array to process.
 * @param {Function} [predicateFunction] - Optional. a function to test each mapped element.
 * @returns {Array} The mapped array, optionally filtered by the predicate function.
 */
function filterMappedArray(inputArray, predicateFunction) {
  // Return empty array if input is not valid or empty
  if (!(inputArray && inputArray.length)) return [];

  // Map the input array using the 'zipArraysWithPadding' function
  const mappedArray = zipArraysWithPadding(inputArray);

  // If no predicate function is provided, return the mapped array as is
  if (predicateFunction == null) return mappedArray;

  // Filter the mapped array using the predicate function
  return mapArray(mappedArray, function (mappedElement) {
    // 'a' is the noop function, used as a placeholder
    return handleReturnIfPresent(predicateFunction, a, mappedElement);
  });
}

module.exports = filterMappedArray;