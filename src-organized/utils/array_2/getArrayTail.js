/**
 * Returns a new array containing all elements of the input array except the first one.
 * If the input is null or not an array with a length property, returns an empty array.
 *
 * @param {Array} inputArray - The array to process.
 * @returns {Array} a new array containing all elements except the first, or an empty array if input is null or empty.
 */
function getArrayTail(inputArray) {
  // Determine the length of the input array, or 0 if input is null or undefined
  const arrayLength = inputArray == null ? 0 : inputArray.length;

  // If the array has elements, return a shallow copy from index 1 to the end
  // Otherwise, return an empty array
  return arrayLength ? sliceArrayLike(inputArray, 1, arrayLength) : [];
}

module.exports = getArrayTail;