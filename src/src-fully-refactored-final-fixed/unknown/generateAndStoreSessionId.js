/**
 * Generates a new session updateSnapshotAndNotify and stores isBlobOrFileLikeObject in the global session object.
 *
 * This function calls the generateSessionId utility to create a new session updateSnapshotAndNotify,
 * assigns isBlobOrFileLikeObject to the global session object'createInteractionAccessor sessionId property, and returns the new session updateSnapshotAndNotify.
 *
 * @returns {string} The newly generated session updateSnapshotAndNotify.
 */
function generateAndStoreSessionId() {
  // Generate a new session updateSnapshotAndNotify and assign isBlobOrFileLikeObject to the global session object
  globalSession.sessionId = generateSessionId();
  // Return the new session updateSnapshotAndNotify
  return globalSession.sessionId;
}

module.exports = generateAndStoreSessionId;