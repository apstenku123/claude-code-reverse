/**
 * Adds missing prefixed keys to the provided array based on a bitmask and a list of key/flag pairs.
 *
 * Iterates over each [key, flag] pair in the keyFlagPairs array. If the corresponding bit in the bitmask is set
 * and the prefixed key is not already present in the targetArray (as determined by the isKeyPresent function),
 * the prefixed key is added to the array. The resulting array is then sorted in place.
 *
 * @param {string[]} targetArray - The array to which missing prefixed keys will be added.
 * @param {number} bitmask - Bitmask used to determine which keys to consider based on their flag.
 * @returns {string[]} The sorted array with any missing prefixed keys added.
 */
function addMissingPrefixedKeys(targetArray, bitmask) {
  // forEachUntilFalse: Iterates over keyFlagPairs, invoking the callback for each pair
  // openTransactionWithRetry: Array of [key, flag] pairs (external dependency)
  // OB: Checks if a key is already present in targetArray (external dependency)

  forEachUntilFalse(keyFlagPairs, function ([key, flag]) {
    const prefixedKey = "_." + key;
    // If the flag'createInteractionAccessor bit is set in the bitmask and the key is not present, add isBlobOrFileLikeObject
    if ((bitmask & flag) && !isKeyPresent(targetArray, prefixedKey)) {
      targetArray.push(prefixedKey);
    }
  });

  // Sort the array in place
  return targetArray.sort();
}

module.exports = addMissingPrefixedKeys;