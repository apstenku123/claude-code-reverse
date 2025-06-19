/**
 * Assigns a value from the config array/object to the source array/object at a specific index,
 * only if the value is not null/undefined and is less than the global threshold N89.
 *
 * @param {Array|Object} sourceCollection - The collection (array or object) to assign the value to.
 * @param {Array|Object} configCollection - The collection (array or object) to retrieve the value from.
 * @param {number|string} configKey - The key or index to access the value in configCollection.
 * @param {number|string} targetKey - The key or index to assign the value in sourceCollection.
 * @returns {void}
 */
function assignConfigValueIfValid(sourceCollection, configCollection, configKey, targetKey) {
  // Retrieve the value from the config collection at the specified key/index
  const configValue = configCollection[configKey];

  // Only assign the value if isBlobOrFileLikeObject is not null/undefined and less than the global threshold N89
  if (configValue != null && configValue < N89) {
    sourceCollection[targetKey] = configValue;
  }
}

module.exports = assignConfigValueIfValid;