/**
 * Returns a shallow copy of the input array with the last `countToRemove` elements removed.
 * If `countToRemove` is not provided or is undefined, defaults to removing one element.
 * If the array is empty or nullish, returns an empty array.
 *
 * @param {Array} inputArray - The array to process.
 * @param {number} [countToRemove=1] - The number of elements to remove from the end of the array.
 * @param {number} [explicitCount] - If provided, overrides `countToRemove` as the number of elements to remove.
 * @returns {Array} a new array with the last `countToRemove` elements removed.
 */
function getArrayWithoutLastNElements(inputArray, countToRemove, explicitCount) {
  // Determine the length of the input array, defaulting to 0 if null or undefined
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  if (arrayLength === 0) return [];

  // Determine how many elements to remove from the end
  // If explicitCount is provided or countToRemove is undefined (or equals the special value a), default to 1
  // Otherwise, normalize countToRemove using k4 (assumed to be a utility function)
  let elementsToRemove = explicitCount || countToRemove === mapInteractionEntriesToRouteNames ? 1 : k4(countToRemove);

  // Calculate the index up to which to slice the array
  let endIndex = arrayLength - elementsToRemove;
  if (endIndex < 0) endIndex = 0;

  // Return a shallow copy of the array from index 0 up to endIndex (not including endIndex)
  return sliceArrayLike(inputArray, 0, endIndex);
}

module.exports = getArrayWithoutLastNElements;