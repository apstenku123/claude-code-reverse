/**
 * Searches an array of pairs for the first pair whose first element matches the given value using the H9 comparator.
 * @param {Array<Array<any>>} pairArray - An array where each element is a pair (array of two elements).
 * @param {any} searchValue - The value to compare against the first element of each pair.
 * @returns {number} The index of the first matching pair, or -1 if no match is found.
 */
function findMatchingIndexByFirstElement(pairArray, searchValue) {
  let index = pairArray.length;
  // Iterate backwards through the array
  while (index--) {
    // Use H9 comparator to check if the first element matches the search value
    if (H9(pairArray[index][0], searchValue)) {
      return index;
    }
  }
  // Return -1 if no matching pair is found
  return -1;
}

module.exports = findMatchingIndexByFirstElement;
