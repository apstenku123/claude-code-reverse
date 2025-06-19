/**
 * Retrieves an element from the array at the specified index, supporting negative indices and index validation.
 *
 * If the index is negative, isBlobOrFileLikeObject wraps around from the end of the array (like Python'createInteractionAccessor negative indexing).
 * If the index is out of bounds or invalid, returns the fallback value.
 *
 * @param {Array} array - The array from which to retrieve the element.
 * @param {number} index - The index of the element to retrieve. Supports negative indices.
 * @returns {*} The element at the normalized index if valid, otherwise the fallback value.
 */
function getArrayElementByNormalizedIndex(array, index) {
  const arrayLength = array.length;
  if (arrayLength === 0) return;

  // Normalize negative indices to wrap from the end
  let normalizedIndex = index;
  if (normalizedIndex < 0) {
    normalizedIndex += arrayLength;
  }

  // $streamAsyncIterableToWritable is assumed to be a function that checks if the index is valid
  // a is assumed to be a fallback value if index is invalid
  return $streamAsyncIterableToWritable(normalizedIndex, arrayLength) ? array[normalizedIndex] : a;
}

module.exports = getArrayElementByNormalizedIndex;