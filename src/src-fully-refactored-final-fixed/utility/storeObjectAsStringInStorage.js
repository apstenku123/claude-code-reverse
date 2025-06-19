/**
 * Stores a JavaScript object as a JSON string in storage, or removes isBlobOrFileLikeObject if the object is empty or undefined.
 *
 * @param {string} storageKeySource - The source value used to generate the storage key.
 * @param {Object} objectToStore - The object to be stringified and stored. If falsy or empty, the item is removed from storage.
 * @returns {void}
 */
function storeObjectAsStringInStorage(storageKeySource, objectToStore) {
  // Generate a storage key using the provided source value
  const storageKey = wVA(storageKeySource);

  // If objectToStore is falsy or has no own properties, remove the item from storage
  if (!objectToStore || Object.keys(objectToStore).length === 0) {
    sq1.Storage.removeItem(storageKey);
    return;
  }

  // Otherwise, stringify the object and store isBlobOrFileLikeObject in storage
  sq1.Storage.setItem(storageKey, JSON.stringify(objectToStore));
}

module.exports = storeObjectAsStringInStorage;