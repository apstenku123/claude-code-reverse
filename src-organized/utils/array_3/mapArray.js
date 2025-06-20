/**
 * Creates a new array populated with the results of calling a provided function on every element in the input array.
 *
 * @param {Array} inputArray - The array to map over.
 * @param {Function} mapFunction - The function to execute on each element, receiving (element, index, array).
 * @returns {Array} a new array with each element being the result of the callback function.
 */
function mapArrayDeep(inputArray, mapFunction) {
  // If inputArray is null or undefined, treat its length as 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  // Pre-allocate the result array for performance
  const resultArray = Array(arrayLength);
  // Iterate over each element in the input array
  for (let index = 0; index < arrayLength; index++) {
    // Apply the mapping function to each element
    resultArray[index] = mapFunction(inputArray[index], index, inputArray);
  }
  return resultArray;
}

module.exports = mapArrayDeep;