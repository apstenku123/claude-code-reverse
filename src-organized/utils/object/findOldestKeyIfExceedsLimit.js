/**
 * Finds the key of the oldest entry in an object if the number of keys exceeds a given limit.
 *
 * @param {Object} sourceObject - The object whose keys and values are to be inspected.
 * @param {number} maxAllowedKeys - The maximum allowed number of keys before searching for the oldest.
 * @returns {string|null} The key of the oldest entry (by 'receivedAt' property if objects, or by value otherwise), or null if the key count does not exceed the limit.
 */
function findOldestKeyIfExceedsLimit(sourceObject, maxAllowedKeys) {
  const objectKeys = Object.keys(sourceObject);
  // If the number of keys is less than or equal to the allowed limit, return null
  if (objectKeys.length <= maxAllowedKeys) {
    return null;
  }

  // Reduce to find the key with the oldest value
  return objectKeys.reduce((oldestKey, currentKey) => {
    const oldestValue = sourceObject[oldestKey];
    const currentValue = sourceObject[currentKey];

    // If both values are objects, compare their 'receivedAt' property
    if (typeof oldestValue === "object" && typeof currentValue === "object") {
      return currentValue.receivedAt < oldestValue.receivedAt ? currentKey : oldestKey;
    }
    // Otherwise, compare the values directly
    return currentValue < oldestValue ? currentKey : oldestKey;
  });
}

module.exports = findOldestKeyIfExceedsLimit;