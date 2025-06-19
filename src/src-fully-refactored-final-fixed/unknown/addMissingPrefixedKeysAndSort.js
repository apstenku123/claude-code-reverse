/**
 * Adds missing prefixed keys to the provided array based on bitmask flags and sorts the result.
 *
 * Iterates over a list of [key, bitmask] pairs, and for each pair, checks if the bitmask is present in the provided flags
 * and if the prefixed key is not already present in the array. If both conditions are met, the prefixed key is added.
 * Finally, the array is sorted in-place and returned.
 *
 * @param {string[]} prefixedKeysArray - The array to which missing prefixed keys will be added.
 * @param {number} flags - Bitmask flags used to determine which keys to add.
 * @returns {string[]} The sorted array of prefixed keys.
 */
function addMissingPrefixedKeysAndSort(prefixedKeysArray, flags) {
  // forEachUntilFalse is assumed to be a utility that iterates over a list of [key, bitmask] pairs
  // openTransactionWithRetry is the list of [key, bitmask] pairs
  // OB checks if the prefixed key exists in prefixedKeysArray
  forEachUntilFalse(openTransactionWithRetry, function ([key, bitmask]) {
    const prefixedKey = "_." + key;
    // If the bitmask is present in flags and the prefixed key is not already in the array, add isBlobOrFileLikeObject
    if ((flags & bitmask) && !OB(prefixedKeysArray, prefixedKey)) {
      prefixedKeysArray.push(prefixedKey);
    }
  });
  // Sort the array in-place
  return prefixedKeysArray.sort();
}

module.exports = addMissingPrefixedKeysAndSort;