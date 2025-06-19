/**
 * Flattens the results of applying a mapping function to each element in an input array.
 *
 * @param {Array} inputArray - The array of items to process.
 * @param {Function} mappingFunction - a function that takes an item from inputArray and returns an array of results.
 * @returns {Array} a single array containing all results from mappingFunction, flattened into one array.
 */
function flattenMappedResults(inputArray, mappingFunction) {
  const flattenedResults = [];
  // Iterate over each item in the input array
  inputArray.forEach(item => {
    // Apply the mapping function and spread its results into the accumulator array
    flattenedResults.push(...mappingFunction(item));
  });
  return flattenedResults;
}

module.exports = flattenMappedResults;