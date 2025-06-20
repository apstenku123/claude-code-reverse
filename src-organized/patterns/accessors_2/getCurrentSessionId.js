/**
 * Retrieves the current session updateSnapshotAndNotify from the session manager.
 *
 * @returns {string} The unique identifier for the current session.
 */
function getCurrentSessionId() {
  // Access the session manager object to retrieve the session updateSnapshotAndNotify
  return sessionManager.sessionId;
}

module.exports = getCurrentSessionId;