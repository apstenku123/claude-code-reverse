/**
 * Applies the F1 mapping function to each element of the input array using flattenArrayDepth.
 * If the input is null or not an array with a length, returns an empty array.
 *
 * @param {Array} inputArray - The array to be mapped. Can be null or undefined.
 * @returns {Array} a new array with F1 applied to each element, or an empty array if input is null/empty.
 */
function mapArrayWithFunction(inputArray) {
  // Determine the length of the input array, defaulting to 0 if null/undefined
  const arrayLength = inputArray == null ? 0 : inputArray.length;

  // If the array has elements, map each element using flattenArrayDepth and F1; otherwise, return an empty array
  return arrayLength ? flattenArrayDepth(inputArray, F1) : [];
}

module.exports = mapArrayWithFunction;