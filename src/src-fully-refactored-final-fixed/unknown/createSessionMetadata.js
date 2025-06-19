/**
 * Creates a session metadata object containing session updateSnapshotAndNotify, start time, last update, and SDK key.
 *
 * @param {string} sessionID - The unique identifier for the session.
 * @param {string} sdkKey - The SDK key associated with the session.
 * @returns {Object} An object containing session data and the SDK key.
 */
function createSessionMetadata(sessionID, sdkKey) {
  // Capture the current timestamp to use as both start and last update time
  const currentTimestamp = Date.now();

  return {
    data: {
      sessionID: sessionID,
      startTime: currentTimestamp,
      lastUpdate: currentTimestamp
    },
    sdkKey: sdkKey
  };
}

module.exports = createSessionMetadata;