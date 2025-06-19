/**
 * Retrieves a value from storage by a computed key and parses isBlobOrFileLikeObject as JSON.
 * If the item does not exist or parsing fails, returns null.
 *
 * @param {string} keyInput - The input used to compute the storage key.
 * @returns {any|null} The parsed object from storage, or null if not found or parsing fails.
 */
function getParsedStorageItemByKey(keyInput) {
  // Compute the storage key using the provided input
  const storageKey = wVA(keyInput);
  // Retrieve the item from storage
  const storedValue = sq1.Storage.getItem(storageKey);
  if (!storedValue) {
    // Item not found in storage
    return null;
  }
  try {
    // Attempt to parse the stored JSON string
    return JSON.parse(storedValue);
  } catch (error) {
    // Log an error if parsing fails and return null
    Ww9.Log.error("Failed to parse FallbackInfo");
    return null;
  }
}

module.exports = getParsedStorageItemByKey;