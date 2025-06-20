/**
 * Assigns a value from the sourceArray to the targetArray at a specified index,
 * only if the value at the given key in the sourceArray is not null/undefined and is less than a predefined threshold (N89).
 *
 * @param {Array<any>} targetArray - The array to which the value may be assigned.
 * @param {Array<any>} sourceArray - The array from which the value is retrieved.
 * @param {number} sourceKey - The index/key in the sourceArray to retrieve the value from.
 * @param {number} targetIndex - The index in the targetArray where the value should be assigned if conditions are met.
 * @returns {void}
 */
function assignIfValidAndBelowThreshold(targetArray, sourceArray, sourceKey, targetIndex) {
  // Retrieve the value from the sourceArray at the specified key
  const value = sourceArray[sourceKey];

  // Only assign if value is not null/undefined and is less than the threshold N89
  if (value != null && value < N89) {
    targetArray[targetIndex] = value;
  }
}

module.exports = assignIfValidAndBelowThreshold;