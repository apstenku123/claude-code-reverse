/**
 * Finds the key in the given object that corresponds to the oldest 'receivedAt' property (if values are objects),
 * or the smallest value otherwise, but only if the number of keys exceeds the given threshold.
 *
 * @param {Object} sourceObject - The object whose keys and values are to be examined.
 * @param {number} minKeyCount - The minimum number of keys required to perform the search. If the object has fewer keys, returns null.
 * @returns {string|null} The key with the oldest 'receivedAt' property or smallest value, or null if the key count is not sufficient.
 */
function findOldestOrSmallestKey(sourceObject, minKeyCount) {
  const keys = Object.keys(sourceObject);
  // If the number of keys is less than or equal to the threshold, return null
  if (keys.length <= minKeyCount) {
    return null;
  }
  // Reduce over the keys to find the desired key
  return keys.reduce((currentBestKey, candidateKey) => {
    const currentBestValue = sourceObject[currentBestKey];
    const candidateValue = sourceObject[candidateKey];

    // If both values are objects, compare their 'receivedAt' property
    if (typeof currentBestValue === "object" && typeof candidateValue === "object") {
      return candidateValue.receivedAt < currentBestValue.receivedAt ? candidateKey : currentBestKey;
    }
    // Otherwise, compare the values directly
    return candidateValue < currentBestValue ? candidateKey : currentBestKey;
  });
}

module.exports = findOldestOrSmallestKey;
