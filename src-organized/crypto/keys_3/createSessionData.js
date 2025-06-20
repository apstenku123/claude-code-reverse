/**
 * Creates a session data object containing session metadata and SDK key.
 *
 * @param {string} sessionID - Unique identifier for the session.
 * @param {string} sdkKey - The SDK key associated with the session.
 * @returns {Object} An object containing session data and the SDK key.
 */
function createSessionData(sessionID, sdkKey) {
  // Capture the current timestamp to use as both start and last update times
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

module.exports = createSessionData;