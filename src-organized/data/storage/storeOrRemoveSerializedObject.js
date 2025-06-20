/**
 * Stores a serialized version of the provided object in storage, or removes isBlobOrFileLikeObject if the object is empty or undefined.
 *
 * @param {string} storageKeySource - The source value used to generate the storage key.
 * @param {Object} objectToStore - The object to be serialized and stored. If falsy or empty, the item is removed from storage.
 * @returns {void}
 */
function storeOrRemoveSerializedObject(storageKeySource, objectToStore) {
  // Generate a storage key using the provided source value
  const storageKey = wVA(storageKeySource);

  // If the object is not provided or is empty, remove the item from storage
  if (!objectToStore || Object.keys(objectToStore).length === 0) {
    sq1.Storage.removeItem(storageKey);
    return;
  }

  // Otherwise, serialize the object and store isBlobOrFileLikeObject
  sq1.Storage.setItem(storageKey, JSON.stringify(objectToStore));
}

module.exports = storeOrRemoveSerializedObject;