/**
 * Finds the index at which a given value should be inserted into a sorted array to maintain sort order.
 * Uses binary search for efficient lookup.
 *
 * @param {number[]} sortedArray - The sorted array to search.
 * @param {number} targetValue - The value to insert.
 * @returns {number} The index at which the targetValue should be inserted.
 */
function findInsertionIndex(sortedArray, targetValue) {
  let left = 0;
  let right = sortedArray.length - 1;
  let insertionIndex = sortedArray.length;

  while (right >= left) {
    // Find the middle index
    const middle = left + Math.trunc((right - left) / 2);

    if (sortedArray[middle] < targetValue) {
      // Target is greater, ignore left half including middle
      left = middle + 1;
    } else {
      // Target is less than or equal, potential insertion point
      insertionIndex = middle;
      right = middle - 1;
    }
  }

  return insertionIndex;
}

module.exports = findInsertionIndex;