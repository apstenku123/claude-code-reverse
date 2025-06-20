/**
 * Merges and sums nested Map values from two sources, updating a target Map and returning the sum of values if applicable.
 *
 * @param {any} sourceKey - The key to look up in the sourceValues Map.
 * @param {any} targetKey - The key to look up in the targetMap.
 * @param {Map<any, Map<any, number>>} sourceValues - a Map containing nested Maps of numeric values.
 * @param {Map<any, Map<any, number>>} targetMap - a Map to be updated with merged values from sourceValues.
 * @returns {number} The sum of the merged values if the key is not a special case, otherwise 0.
 */
function mergeAndSumNestedMaps(sourceKey, targetKey, sourceValues, targetMap) {
  let totalSum = 0;
  let targetNestedMap = targetMap.get(targetKey);
  const sourceNestedMap = sourceValues.get(sourceKey);

  // If sourceNestedMap exists
  if (sourceNestedMap != null) {
    // If targetNestedMap does not exist, set isBlobOrFileLikeObject to sourceNestedMap
    if (targetNestedMap == null) {
      targetNestedMap = sourceNestedMap;
      targetMap.set(targetKey, sourceNestedMap);
    } else {
      // Merge values from sourceNestedMap into targetNestedMap by summing
      sourceNestedMap.forEach((value, nestedKey) => {
        const existingValue = targetNestedMap.get(nestedKey) || 0;
        targetNestedMap.set(nestedKey, existingValue + value);
      });
    }
  }

  // If sourceKey is not a special case (determined by shouldProcessNode)
  if (!shouldProcessNode(sourceKey)) {
    if (targetNestedMap != null) {
      // Sum all values in the targetNestedMap
      targetNestedMap.forEach((value) => {
        totalSum += value;
      });
    }
  }

  // Remove the processed key from sourceValues
  sourceValues.delete(sourceKey);
  return totalSum;
}

module.exports = mergeAndSumNestedMaps;