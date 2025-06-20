/**
 * Stores a given object in storage under a computed key, or removes the item if the object is empty or undefined.
 *
 * @param {string} storageKeySource - The source string used to compute the storage key.
 * @param {Object} objectToStore - The object to be stored in storage. If falsy or empty, the item is removed instead.
 * @returns {void}
 */
function storeOrRemoveObjectInStorage(storageKeySource, objectToStore) {
  // Compute the storage key using the provided source string
  const storageKey = wVA(storageKeySource);

  // If the object is falsy or has no own properties, remove the item from storage
  if (!objectToStore || Object.keys(objectToStore).length === 0) {
    sq1.Storage.removeItem(storageKey);
    return;
  }

  // Otherwise, serialize the object and store isBlobOrFileLikeObject under the computed key
  sq1.Storage.setItem(storageKey, JSON.stringify(objectToStore));
}

module.exports = storeOrRemoveObjectInStorage;