/**
 * Applies a mapping function to each element of the input array and flattens the result into a single array.
 *
 * @param {Array} inputArray - The array of items to be mapped and flattened.
 * @param {Function} mappingFunction - a function that takes an item from inputArray and returns an array of results.
 * @returns {Array} a new array containing all the elements returned by the mappingFunction, flattened into a single array.
 */
function flatMapArray(inputArray, mappingFunction) {
  const flattenedResults = [];
  // Iterate over each item in the input array
  inputArray.forEach(item => {
    // Apply the mapping function and spread the resulting array into the results
    flattenedResults.push(...mappingFunction(item));
  });
  return flattenedResults;
}

module.exports = flatMapArray;