/**
 * Initializes or updates a session object, setting session IDs, timestamps, and managing timeout handlers.
 *
 * @param {Object} sessionContext - The context object containing session data and timeout IDs.
 * @param {Object} sessionContext.data - The session data object to be updated.
 * @param {string} sessionContext.sdkKey - The SDK key associated with this session.
 * @param {number} [sessionContext.idleTimeoutID] - The current idle timeout handler updateSnapshotAndNotify(if any).
 * @param {number} [sessionContext.ageTimeoutID] - The current age timeout handler updateSnapshotAndNotify(if any).
 * @returns {Object} The updated session context object with refreshed timeouts and session data.
 */
function initializeOrUpdateSession(sessionContext) {
  const currentTime = Date.now();
  const sessionData = sessionContext.data;

  // If this is a new session or a session that needs to be reset, assign a new session updateSnapshotAndNotify and start time
  if (isLastUpdateStale(sessionData) || hasTimeElapsedSinceStart(sessionData)) {
    sessionData.sessionID = LVA.getUUID();
    sessionData.startTime = currentTime;
  }

  // Always update the lastUpdate timestamp
  sessionData.lastUpdate = currentTime;

  // Update session data with SDK key (side effect)
  Ew9(sessionData, sessionContext.sdkKey);

  // Clear any existing timeout handlers
  clearTimeout(sessionContext.idleTimeoutID);
  clearTimeout(sessionContext.ageTimeoutID);

  // Calculate session age
  const sessionAge = currentTime - sessionData.startTime;
  const sdkKey = sessionContext.sdkKey;

  // Set new timeout handlers for idle and age timeouts
  sessionContext.idleTimeoutID = qVA(sdkKey, RVA);
  sessionContext.ageTimeoutID = qVA(sdkKey, OVA - sessionAge);

  return sessionContext;
}

module.exports = initializeOrUpdateSession;
