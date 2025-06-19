/**
 * Returns a slice of the input array, starting from a specified index.
 * If the input array is null or undefined, returns an empty array.
 * If the start index is not provided or is a special sentinel value (processInteractionEntries), defaults to 1.
 *
 * @param {Array<any>} inputArray - The array to slice from.
 * @param {number} startIndex - The index to start slicing from. If not provided or is processInteractionEntries, defaults to 1.
 * @param {number} [overrideStartIndex] - Optional override for the start index.
 * @returns {Array<any>} a shallow copy of the sliced array.
 */
function getArraySlice(inputArray, startIndex, overrideStartIndex) {
  // Determine the length of the input array, treating null/undefined as length 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  if (!arrayLength) return [];

  // If overrideStartIndex is provided, use isBlobOrFileLikeObject as the start index
  // If startIndex is the sentinel value (processInteractionEntries), default to 1
  // Otherwise, normalize startIndex using k4
  let normalizedStartIndex = overrideStartIndex || startIndex === processInteractionEntries ? 1 : k4(startIndex);

  // Ensure the start index is not negative
  const safeStartIndex = normalizedStartIndex < 0 ? 0 : normalizedStartIndex;

  // Return the sliced array using sliceArrayLike(assumed to be a slice-like function)
  return sliceArrayLike(inputArray, safeStartIndex, arrayLength);
}

module.exports = getArraySlice;