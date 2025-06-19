/**
 * Updates or removes a storage item based on the provided configuration object.
 *
 * If the config object is empty or not provided, the storage item is removed.
 * Otherwise, the config object is stringified and stored.
 *
 * @param {string} storageKeySource - The source value used to generate the storage key.
 * @param {Object} configObject - The configuration object to store. If empty or falsy, the item is removed.
 * @returns {void}
 */
function updateStorageItem(storageKeySource, configObject) {
  // Generate the storage key using the provided source
  const storageKey = wVA(storageKeySource);

  // If configObject is not provided or is an empty object, remove the item from storage
  if (!configObject || Object.keys(configObject).length === 0) {
    sq1.Storage.removeItem(storageKey);
    return;
  }

  // Otherwise, store the stringified configObject in storage
  sq1.Storage.setItem(storageKey, JSON.stringify(configObject));
}

module.exports = updateStorageItem;