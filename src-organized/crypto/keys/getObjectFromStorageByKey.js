/**
 * Retrieves an object from storage using a processed key derived from the input.
 *
 * @param {string} sourceKey - The original key or identifier to be processed.
 * @returns {Object} The object retrieved from storage corresponding to the processed key.
 */
function getObjectFromStorageByKey(sourceKey) {
  // Process the input key using vCA to obtain the storage key
  const processedKey = vCA(sourceKey);
  // Retrieve the object from storage using the processed key
  return fCA._getObjectFromStorage(processedKey);
}

module.exports = getObjectFromStorageByKey;