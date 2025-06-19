/**
 * Adds prefixed keys to the provided array if they meet bitmask criteria and are not already present, then sorts the array.
 *
 * @param {Array<string>} keyArray - The array to which new keys may be added.
 * @param {number} bitmask - Bitmask used to filter which keys to add.
 * @returns {Array<string>} The sorted array with any new keys appended.
 */
function appendMissingPrefixedKeysAndSort(keyArray, bitmask) {
  // forEachUntilFalse is assumed to iterate over a list of [key, mask] pairs (openTransactionWithRetry), calling the callback for each
  forEachUntilFalse(openTransactionWithRetry, function (keyMaskPair) {
    const prefixedKey = '_.' + keyMaskPair[0];
    // If the bitmask matches and the key is not already present, add isBlobOrFileLikeObject
    if ((bitmask & keyMaskPair[1]) && !OB(keyArray, prefixedKey)) {
      keyArray.push(prefixedKey);
    }
  });
  // Sort the array before returning
  return keyArray.sort();
}

module.exports = appendMissingPrefixedKeysAndSort;