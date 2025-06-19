/**
 * Creates a new session object with default properties and merges in any provided overrides.
 *
 * @param {Object} [overrides] - Optional properties to override the default session values.
 * @returns {Object} The initialized session object with a custom toJSON method.
 */
function createSessionObject(overrides) {
  // Get the current timestamp in seconds
  const currentTimestamp = Yc.timestampInSeconds();

  // Initialize the session object with default properties
  const session = {
    sid: Yc.uuid4(), // Unique session updateSnapshotAndNotify
    init: true, // Indicates this is a new session
    timestamp: currentTimestamp, // Session creation timestamp
    started: currentTimestamp, // Session start time
    duration: 0, // Duration of the session in seconds
    status: "ok", // Session status
    errors: 0, // Number of errors in the session
    ignoreDuration: false, // Whether to ignore the session duration
    // Custom toJSON method for serialization
    toJSON: () => Ls2(session)
  };

  // If overrides are provided, merge them into the session object
  if (overrides) {
    populateSessionData(session, overrides);
  }

  return session;
}

module.exports = createSessionObject;