/**
 * Applies a mapping function to each element of an array and returns a new array with the results.
 *
 * @param {Array} sourceArray - The array to iterate over and map.
 * @param {Function} mapFunction - The function to apply to each element. Receives (element, index, array).
 * @returns {Array} a new array containing the results of calling the mapping function on each element of the source array.
 */
function mapArrayElements(sourceArray, mapFunction) {
  // If sourceArray is null or undefined, treat its length as 0
  const arrayLength = sourceArray == null ? 0 : sourceArray.length;
  // Pre-allocate the result array for performance
  const mappedArray = Array(arrayLength);
  // Iterate over each element and apply the mapping function
  for (let index = 0; index < arrayLength; index++) {
    mappedArray[index] = mapFunction(sourceArray[index], index, sourceArray);
  }
  return mappedArray;
}

module.exports = mapArrayElements;