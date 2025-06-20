/**
 * Merges map entries from a source map into a target map and calculates the sum of values for a given key.
 *
 * If the source map (inputMap) contains an entry for sourceKey, and the target map (targetMap) does not have an entry for targetKey,
 * the entry from the source map is copied to the target map. If both maps have entries, their values (which are assumed to be maps themselves)
 * are merged by summing values for matching sub-keys. The function then sums all values for the targetKey in the target map,
 * unless the shouldSkipSum function returns true for the sourceKey.
 *
 * @param {any} sourceKey - The key to look up in the input map.
 * @param {any} targetKey - The key to look up or set in the target map.
 * @param {Map<any, Map<any, number>>} inputMap - The source map containing entries to merge.
 * @param {Map<any, Map<any, number>>} targetMap - The target map to merge entries into and sum values from.
 * @returns {number} The sum of all values for the targetKey in the target map, or 0 if not applicable.
 */
function mergeAndSumMapEntries(sourceKey, targetKey, inputMap, targetMap) {
  let totalSum = 0;
  let targetEntry = targetMap.get(targetKey);
  const sourceEntry = inputMap.get(sourceKey);

  // If the source entry exists
  if (sourceEntry != null) {
    // If the target entry does not exist, copy the source entry to the target map
    if (targetEntry == null) {
      targetEntry = sourceEntry;
      targetMap.set(targetKey, sourceEntry);
    } else {
      // If both entries exist, merge them by summing values for each sub-key
      sourceEntry.forEach((sourceValue, subKey) => {
        const existingValue = targetEntry.get(subKey) || 0;
        targetEntry.set(subKey, existingValue + sourceValue);
      });
    }
  }

  // If the shouldSkipSum function returns false for the sourceKey, sum all values in the target entry
  if (!shouldSkipSum(sourceKey)) {
    if (targetEntry != null) {
      targetEntry.forEach((value) => {
        totalSum += value;
      });
    }
  }

  // Remove the source entry from the input map
  inputMap.delete(sourceKey);

  return totalSum;
}

module.exports = mergeAndSumMapEntries;