/**
 * Retrieves existing session data for the provided SDK key, or creates a new session if none exists.
 *
 * @param {string} sdkKey - The unique identifier for the SDK session.
 * @returns {{ data: object, sdkKey: string }} An object containing the session data and the provided SDK key.
 */
function getOrCreateSessionData(sdkKey) {
  // Attempt to retrieve existing session data for the given SDK key
  let sessionData = Uw9(sdkKey);
  const currentTimestamp = Date.now();

  // If no session data exists, create a new session object
  if (!sessionData) {
    sessionData = {
      sessionID: LVA.getUUID(), // Generate a new unique session updateSnapshotAndNotify
      startTime: currentTimestamp, // Set the session start time
      lastUpdate: currentTimestamp // Initialize last update time
    };
  }

  return {
    data: sessionData,
    sdkKey: sdkKey
  };
}

module.exports = getOrCreateSessionData;