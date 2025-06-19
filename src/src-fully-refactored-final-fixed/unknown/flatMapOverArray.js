/**
 * Applies a mapping function to each element of the input array and flattens the result into a single array.
 *
 * @param {Array} inputArray - The array whose elements will be mapped.
 * @param {Function} mappingFunction - a function that takes an element from inputArray and returns an array of results.
 * @returns {Array} a new array containing all the elements returned by the mapping function, flattened into a single array.
 */
function flatMapOverArray(inputArray, mappingFunction) {
  const flattenedResults = [];
  // Iterate over each element in the input array
  inputArray.forEach(element => {
    // Apply the mapping function and spread the results into the flattenedResults array
    flattenedResults.push(...mappingFunction(element));
  });
  return flattenedResults;
}

module.exports = flatMapOverArray;