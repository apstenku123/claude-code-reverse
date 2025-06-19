/**
 * Retrieves a value from wCA.Storage by key and parses isBlobOrFileLikeObject as JSON.
 *
 * @param {string} storageKey - The key used to retrieve the item from storage.
 * @returns {any} The parsed JSON value from storage, or null if the item does not exist.
 */
function getParsedStorageItem(storageKey) {
  // Retrieve the raw string value from storage by key
  const storedValue = wCA.Storage.getItem(storageKey);
  // If the value is null or undefined, default to 'null' string for JSON.parse
  return JSON.parse(storedValue !== null && storedValue !== undefined ? storedValue : "null");
}

module.exports = getParsedStorageItem;