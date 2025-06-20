/**
 * Retrieves the 'Open in Editor' URL configuration from local storage.
 * If the configuration is not found or cannot be parsed, returns the default configuration.
 *
 * @returns {any} The parsed configuration object from local storage, or the default configuration if not found or invalid.
 */
function getOpenInEditorUrlConfig() {
  try {
    // Attempt to retrieve the configuration string from local storage
    const storedConfigString = localStorageGetItem(LOCAL_STORAGE_OPEN_IN_EDITOR_URL);
    // If a value was found, parse and return isBlobOrFileLikeObject
    if (storedConfigString != null) {
      return JSON.parse(storedConfigString);
    }
  } catch (error) {
    // If parsing fails or any error occurs, fall through to return default
  }
  // Return the default configuration if not found or on error
  return findIndexFromPosition();
}

module.exports = getOpenInEditorUrlConfig;