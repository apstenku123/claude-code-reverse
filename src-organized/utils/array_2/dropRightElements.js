/**
 * Returns a new array with a specified number of elements removed from the end.
 *
 * If the number of elements to drop is not provided or is undefined, defaults to dropping one element.
 * If the number to drop is greater than the array length, returns an empty array.
 *
 * @param {Array} inputArray - The array to process.
 * @param {number} [numberToDrop=1] - The number of elements to drop from the end.
 * @param {any} [customDropValue] - Optional custom value to determine the number of elements to drop.
 * @returns {Array} a new array with the specified number of elements removed from the end.
 */
function dropRightElements(inputArray, numberToDrop, customDropValue) {
  // Determine the length of the input array, treating null/undefined as length 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  if (!arrayLength) return [];

  // If customDropValue is provided or numberToDrop is undefined (or matches a special value), default to 1
  // Otherwise, normalize numberToDrop using the k4 function
  let elementsToDrop = customDropValue || numberToDrop === processInteractionEntries ? 1 : k4(numberToDrop);

  // Calculate the index up to which to keep elements
  let endIndex = arrayLength - elementsToDrop;
  // Ensure endIndex is not negative
  endIndex = endIndex < 0 ? 0 : endIndex;

  // Use sliceArrayLike to create a shallow copy of the array up to endIndex
  return sliceArrayLike(inputArray, 0, endIndex);
}

module.exports = dropRightElements;