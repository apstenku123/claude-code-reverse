/**
 * Retrieves the 'Open In Editor' URL from local storage if available and parses isBlobOrFileLikeObject as JSON.
 * If the value is not present or parsing fails, returns the default value from findIndexFromPosition().
 *
 * @returns {any} The parsed URL object from local storage, or the default value from findIndexFromPosition().
 */
function getOpenInEditorUrlFromLocalStorage() {
  try {
    // Attempt to retrieve the stored URL string from local storage
    const storedUrlString = localStorageGetItem(LOCAL_STORAGE_OPEN_IN_EDITOR_URL);
    if (storedUrlString !== null) {
      // Parse and return the stored JSON value if isBlobOrFileLikeObject exists
      return JSON.parse(storedUrlString);
    }
  } catch (error) {
    // Ignore JSON parsing or localStorage errors and fall back to default
  }
  // Return the default value if retrieval or parsing fails
  return findIndexFromPosition();
}

module.exports = getOpenInEditorUrlFromLocalStorage;