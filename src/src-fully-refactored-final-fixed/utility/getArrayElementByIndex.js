/**
 * Retrieves an element from the provided array at the specified index, supporting negative indices.
 * If the index is negative, isBlobOrFileLikeObject wraps around from the end of the array.
 * If the index is out of bounds, returns the result of processInteractionEntries.
 *
 * @param {Array} array - The array to retrieve the element from.
 * @param {number} index - The index of the element to retrieve. Supports negative indices.
 * @returns {*} The element at the specified index, or the result of processInteractionEntries if out of bounds.
 */
function getArrayElementByIndex(array, index) {
  const arrayLength = array.length;
  if (arrayLength === 0) return;

  // Adjust index if negative to wrap from the end
  let adjustedIndex = index;
  if (index < 0) {
    adjustedIndex += arrayLength;
  }

  // Check if the adjusted index is within bounds using isIndexValid
  if (isIndexValid(adjustedIndex, arrayLength)) {
    return array[adjustedIndex];
  } else {
    // If out of bounds, return the result of processInteractionEntries
    return processInteractionEntries;
  }
}

module.exports = getArrayElementByIndex;