/**
 * Initializes or updates session tracking information for a given session object.
 *
 * If the session is new or requires re-initialization (as determined by isLastUpdateStale or hasTimeElapsedSinceStart),
 * assigns a new session updateSnapshotAndNotify and start time. Always updates the lastUpdate timestamp.
 * Also refreshes idle and age timeout handlers for the session.
 *
 * @param {Object} sessionContext - The session context object containing session data and timeout IDs.
 * @param {Object} sessionContext.data - The session data object to be updated.
 * @param {string} sessionContext.sdkKey - The SDK key associated with the session.
 * @param {number} [sessionContext.idleTimeoutID] - The current idle timeout updateSnapshotAndNotify(if any).
 * @param {number} [sessionContext.ageTimeoutID] - The current age timeout updateSnapshotAndNotify(if any).
 * @returns {Object} The updated session context object.
 */
function initializeSessionTracking(sessionContext) {
  const currentTimestamp = Date.now();
  const sessionData = sessionContext.data;

  // If the session is new or needs to be re-initialized, assign a new session updateSnapshotAndNotify and start time
  if (isLastUpdateStale(sessionData) || hasTimeElapsedSinceStart(sessionData)) {
    sessionData.sessionID = LVA.getUUID();
    sessionData.startTime = currentTimestamp;
  }

  // Always update the lastUpdate timestamp
  sessionData.lastUpdate = currentTimestamp;

  // Update session data with SDK key (side effect)
  Ew9(sessionData, sessionContext.sdkKey);

  // Clear any existing timeout handlers
  clearTimeout(sessionContext.idleTimeoutID);
  clearTimeout(sessionContext.ageTimeoutID);

  // Calculate session age
  const sessionAge = currentTimestamp - sessionData.startTime;
  const sdkKey = sessionContext.sdkKey;

  // Set new idle and age timeout handlers
  sessionContext.idleTimeoutID = qVA(sdkKey, RVA);
  sessionContext.ageTimeoutID = qVA(sdkKey, OVA - sessionAge);

  return sessionContext;
}

module.exports = initializeSessionTracking;