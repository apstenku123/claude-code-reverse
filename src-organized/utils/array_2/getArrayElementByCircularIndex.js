/**
 * Retrieves an element from the array at the specified index, supporting negative indices (circular indexing).
 * If the index is out of bounds, returns the fallback value.
 *
 * @param {Array} array - The array to retrieve the element from.
 * @param {number} index - The index of the element to retrieve. Negative indices count from the end.
 * @returns {*} The element at the specified index, or the fallback value if the index is invalid.
 */
function getArrayElementByCircularIndex(array, index) {
  const arrayLength = array.length;
  if (arrayLength === 0) return;

  // Adjust index for negative values to wrap around the array
  let adjustedIndex = index;
  if (index < 0) {
    adjustedIndex += arrayLength;
  }

  // $streamAsyncIterableToWritable is assumed to be a function that checks if the index is valid
  // a is assumed to be a fallback value if the index is invalid
  return $streamAsyncIterableToWritable(adjustedIndex, arrayLength) ? array[adjustedIndex] : a;
}

module.exports = getArrayElementByCircularIndex;