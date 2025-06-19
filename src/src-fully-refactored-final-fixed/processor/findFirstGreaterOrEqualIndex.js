/**
 * Performs a binary search to find the index of the first element in a sorted array
 * that is greater than or equal to the target value. If all elements are less than
 * the target, returns the array'createInteractionAccessor length (i.e., the insertion point).
 *
 * @param {number[]} sortedArray - a sorted array of numbers to search.
 * @param {number} targetValue - The value to compare against elements in the array.
 * @returns {number} The index of the first element greater than or equal to targetValue,
 *                   or the array'createInteractionAccessor length if no such element exists.
 */
function findFirstGreaterOrEqualIndex(sortedArray, targetValue) {
  let left = 0;
  let right = sortedArray.length - 1;
  let resultIndex = sortedArray.length; // Default to array length if not found

  while (right >= left) {
    // Find the middle index
    const middle = left + Math.trunc((right - left) / 2);

    if (sortedArray[middle] < targetValue) {
      // Target is greater, search right half
      left = middle + 1;
    } else {
      // Potential answer found, but continue searching left half for earlier occurrence
      resultIndex = middle;
      right = middle - 1;
    }
  }

  return resultIndex;
}

module.exports = findFirstGreaterOrEqualIndex;