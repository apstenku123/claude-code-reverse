/**
 * Finds the key in an object whose value is either the earliest (by 'receivedAt' property) or the smallest value.
 * If the number of keys in the object is less than or equal to the threshold, returns null.
 *
 * @param {Object} objectWithValues - The object whose keys and values will be evaluated.
 * @param {number} minKeyCountThreshold - The minimum number of keys required to perform the search.
 * @returns {string|null} The key with the earliest 'receivedAt' or smallest value, or null if threshold not met.
 */
function findKeyOfEarliestOrSmallestValue(objectWithValues, minKeyCountThreshold) {
  const objectKeys = Object.keys(objectWithValues);
  // If the number of keys is less than or equal to the threshold, return null
  if (objectKeys.length <= minKeyCountThreshold) return null;

  // Reduce to find the key with the earliest 'receivedAt' (if objects), or smallest value otherwise
  return objectKeys.reduce((currentBestKey, candidateKey) => {
    const currentBestValue = objectWithValues[currentBestKey];
    const candidateValue = objectWithValues[candidateKey];

    // If both values are objects, compare their 'receivedAt' property
    if (typeof currentBestValue === "object" && typeof candidateValue === "object") {
      return candidateValue.receivedAt < currentBestValue.receivedAt ? candidateKey : currentBestKey;
    }
    // Otherwise, compare values directly
    return candidateValue < currentBestValue ? candidateKey : currentBestKey;
  });
}

module.exports = findKeyOfEarliestOrSmallestValue;
