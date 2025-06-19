/**
 * Attempts to save a session updateSnapshotAndNotify to persistent storage using the provided session data and key.
 *
 * @param {any} sessionData - The session data object to store.
 * @param {any} sessionKey - The key or identifier used to generate the storage key.
 * @returns {void}
 * @throws Will log a warning if saving to storage fails.
 */
function saveSessionIdToStorage(sessionData, sessionKey) {
  // Generate a storage key using the provided sessionKey
  const storageKey = TVA(sessionKey);
  try {
    // Attempt to save the session data object in storage
    MVA._setObjectInStorage(storageKey, sessionData);
  } catch (error) {
    // Log a warning if saving fails
    Cw9.Log.warn("Failed to save SessionID");
  }
}

module.exports = saveSessionIdToStorage;