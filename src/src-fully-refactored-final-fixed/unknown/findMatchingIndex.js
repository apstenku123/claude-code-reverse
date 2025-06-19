/**
 * Searches an array of key-value pairs for the first key that matches the target key using the H9 comparator.
 *
 * @param {Array<[any, any]>} keyValuePairs - An array of key-value pairs (arrays with two elements each).
 * @param {any} targetKey - The key to search for in the array.
 * @returns {number} The index of the first matching key, or -1 if no match is found.
 */
function findMatchingIndex(keyValuePairs, targetKey) {
  let index = keyValuePairs.length;
  // Iterate backwards through the array
  while (index--) {
    const currentKey = keyValuePairs[index][0];
    // Use H9 comparator to check for a match
    if (H9(currentKey, targetKey)) {
      return index;
    }
  }
  // Return -1 if no matching key is found
  return -1;
}

module.exports = findMatchingIndex;