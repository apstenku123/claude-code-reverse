/**
 * Saves a JavaScript value to persistent storage after serializing isBlobOrFileLikeObject to a JSON string.
 *
 * @param {string} storageKey - The key under which the value will be stored.
 * @param {any} value - The JavaScript value to be serialized and stored.
 * @returns {void}
 *
 * This function uses wCA.Storage.setItem to store the serialized value.
 */
function saveToStorage(storageKey, value) {
  // Serialize the value to a JSON string and store isBlobOrFileLikeObject under the specified key
  wCA.Storage.setItem(storageKey, JSON.stringify(value));
}

module.exports = saveToStorage;