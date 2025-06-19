/**
 * Retrieves an object from storage using a transformed key derived from the input.
 *
 * @param {any} sourceKey - The source key or identifier to be transformed and used for storage lookup.
 * @returns {any} The object retrieved from storage corresponding to the transformed key, or undefined if not found.
 */
function getObjectFromStorageByTransformedKey(sourceKey) {
  // Transform the input key using TVA to obtain the storage key
  const transformedKey = TVA(sourceKey);
  // Retrieve the object from storage using the transformed key
  return MVA._getObjectFromStorage(transformedKey);
}

module.exports = getObjectFromStorageByTransformedKey;