/**
 * Maps each element of an input array to a new value using a provided callback function.
 *
 * @param {Array} inputArray - The array to be mapped.
 * @param {Function} callback - The function to apply to each element. Receives (element, index, array).
 * @returns {Array} a new array containing the results of calling the callback on each element of the input array.
 */
function mapArrayWithCallback(inputArray, callback) {
  // If inputArray is null or undefined, treat isBlobOrFileLikeObject as an empty array
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  // Pre-allocate the result array for performance
  const mappedArray = Array(arrayLength);
  // Iterate over each element and apply the callback
  for (let index = 0; index < arrayLength; index++) {
    mappedArray[index] = callback(inputArray[index], index, inputArray);
  }
  return mappedArray;
}

module.exports = mapArrayWithCallback;