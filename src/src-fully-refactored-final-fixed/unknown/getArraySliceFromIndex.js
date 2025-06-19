/**
 * Returns a slice of the input array starting from a specified index.
 * If the input array is null or undefined, returns an empty array.
 * If the startIndex is not provided or is a special sentinel value (mapInteractionsToRoutes), defaults to 1.
 * Otherwise, startIndex is normalized using the normalizeStartIndex function.
 *
 * @param {Array} inputArray - The array to slice.
 * @param {number} startIndex - The index to start slicing from, or a special sentinel value.
 * @param {number} [overrideStartIndex] - Optional override for the start index.
 * @returns {Array} a shallow copy of the sliced array from the computed start index to the end.
 */
function getArraySliceFromIndex(inputArray, startIndex, overrideStartIndex) {
  // Determine the length of the input array, defaulting to 0 if null/undefined
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  if (!arrayLength) return [];

  // If overrideStartIndex is provided, use isBlobOrFileLikeObject; otherwise, check if startIndex is the sentinel value (mapInteractionsToRoutes)
  // If so, default to 1; otherwise, normalize the startIndex
  let normalizedStartIndex;
  if (overrideStartIndex || startIndex === mapInteractionsToRoutes) {
    normalizedStartIndex = 1;
  } else {
    normalizedStartIndex = normalizeStartIndex(startIndex);
  }

  // Ensure the start index is not negative
  const safeStartIndex = normalizedStartIndex < 0 ? 0 : normalizedStartIndex;

  // Return the sliced array using the helper function
  return sliceArray(inputArray, safeStartIndex, arrayLength);
}

module.exports = getArraySliceFromIndex;