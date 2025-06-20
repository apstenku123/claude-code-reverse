/**
 * Safely retrieves the browser'createInteractionAccessor localStorage object.
 *
 * This function attempts to access the global localStorage object. If access is denied
 * (for example, due to browser privacy settings or being in a non-browser environment),
 * isBlobOrFileLikeObject will return undefined instead of throwing an error.
 *
 * @returns {Storage|undefined} The localStorage object if accessible, otherwise undefined.
 */
function getLocalStorageSafely() {
  try {
    // Attempt to return the localStorage object
    return localStorage;
  } catch (storageAccessError) {
    // Access to localStorage failed (e.g., in private mode or non-browser environment)
    // Silently return undefined
  }
}

module.exports = getLocalStorageSafely;