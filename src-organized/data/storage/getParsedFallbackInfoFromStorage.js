/**
 * Retrieves and parses fallback information from storage using a derived key.
 *
 * @param {any} sourceKey - The source value used to derive the storage key.
 * @returns {object|null} The parsed fallback information object, or null if not found or parsing fails.
 */
function getParsedFallbackInfoFromStorage(sourceKey) {
  // Derive the storage key from the provided sourceKey
  const storageKey = wVA(sourceKey);
  // Attempt to retrieve the raw fallback info string from storage
  const fallbackInfoString = sq1.Storage.getItem(storageKey);

  // If no data is found in storage, return null
  if (!fallbackInfoString) {
    return null;
  }

  try {
    // Attempt to parse the JSON string from storage
    return JSON.parse(fallbackInfoString);
  } catch (parseError) {
    // Log an error if parsing fails and return null
    Ww9.Log.error("Failed to parse FallbackInfo");
    return null;
  }
}

module.exports = getParsedFallbackInfoFromStorage;