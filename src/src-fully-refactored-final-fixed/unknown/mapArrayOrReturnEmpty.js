/**
 * Maps the elements of an array using the provided mapping function, or returns an empty array if the input is null or undefined.
 *
 * @param {Array} inputArray - The array to be mapped. If null or undefined, an empty array is returned.
 * @returns {Array} The mapped array, or an empty array if input is null/undefined.
 */
function mapArrayOrReturnEmpty(inputArray) {
  // Determine the length of the input array, or 0 if input is null/undefined
  const arrayLength = inputArray == null ? 0 : inputArray.length;

  // If the array has elements, map them using the mapping function (F1), otherwise return an empty array
  return arrayLength ? flattenArrayDepth(inputArray, F1) : [];
}

module.exports = mapArrayOrReturnEmpty;