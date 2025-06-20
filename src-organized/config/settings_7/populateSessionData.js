/**
 * Populates and normalizes a session data object with values from a configuration object.
 * Ensures required fields are set, applies defaults, and handles field precedence.
 *
 * @param {Object} sessionData - The session data object to be populated and normalized. This object is mutated in-place.
 * @param {Object} [options={}] - Optional configuration object providing additional session context and overrides.
 * @param {Object} [options.user] - User information (may contain id, email, username, ip_address).
 * @param {string|number} [options.did] - Device/user/session identifier override.
 * @param {number} [options.timestamp] - Timestamp for the session (in seconds). Defaults to current time.
 * @param {string} [options.abnormal_mechanism] - Abnormal mechanism reason, if any.
 * @param {boolean} [options.ignoreDuration] - If true, duration will be ignored.
 * @param {string} [options.sid] - Session updateSnapshotAndNotify. If not 32 chars, a new UUID will be generated.
 * @param {boolean} [options.init] - Whether this is an initial session.
 * @param {number} [options.started] - Session start timestamp (in seconds).
 * @param {number} [options.duration] - Explicit session duration (in seconds).
 * @param {string} [options.release] - Release version.
 * @param {string} [options.environment] - Environment name.
 * @param {string} [options.ipAddress] - IP address override.
 * @param {string} [options.userAgent] - User agent string.
 * @param {number} [options.errors] - Number of errors in session.
 * @param {string} [options.status] - Session status.
 * @returns {void}
 */
function populateSessionData(sessionData, options = {}) {
  // Populate user-related fields if user info is provided
  if (options.user) {
    // Set IP address from user if not already present
    if (!sessionData.ipAddress && options.user.ip_address) {
      sessionData.ipAddress = options.user.ip_address;
    }
    // Set device/user/session identifier if not present
    if (!sessionData.did && !options.did) {
      sessionData.did = options.user.id || options.user.email || options.user.username;
    }
  }

  // Set timestamp (prefer options.timestamp, fallback to current time)
  sessionData.timestamp = options.timestamp || Yc.timestampInSeconds();

  // Set abnormal mechanism if provided
  if (options.abnormal_mechanism) {
    sessionData.abnormal_mechanism = options.abnormal_mechanism;
  }

  // Set ignoreDuration flag if provided
  if (options.ignoreDuration) {
    sessionData.ignoreDuration = options.ignoreDuration;
  }

  // Set session updateSnapshotAndNotify(sid), generate if not valid
  if (options.sid) {
    sessionData.sid = options.sid.length === 32 ? options.sid : Yc.uuid4();
  }

  // Set init flag if provided (can be false)
  if (options.init !== undefined) {
    sessionData.init = options.init;
  }

  // Set did if not already set and provided in options
  if (!sessionData.did && options.did) {
    sessionData.did = String(options.did);
  }

  // Set started timestamp if provided
  if (typeof options.started === "number") {
    sessionData.started = options.started;
  }

  // Handle duration logic
  if (sessionData.ignoreDuration) {
    // If ignoreDuration is set, remove duration
    sessionData.duration = undefined;
  } else if (typeof options.duration === "number") {
    // Use explicit duration if provided
    sessionData.duration = options.duration;
  } else {
    // Compute duration from timestamp and started
    const computedDuration = sessionData.timestamp - sessionData.started;
    sessionData.duration = computedDuration >= 0 ? computedDuration : 0;
  }

  // Set release if provided
  if (options.release) {
    sessionData.release = options.release;
  }

  // Set environment if provided
  if (options.environment) {
    sessionData.environment = options.environment;
  }

  // Set IP address if not already set and provided in options
  if (!sessionData.ipAddress && options.ipAddress) {
    sessionData.ipAddress = options.ipAddress;
  }

  // Set user agent if not already set and provided in options
  if (!sessionData.userAgent && options.userAgent) {
    sessionData.userAgent = options.userAgent;
  }

  // Set errors count if provided
  if (typeof options.errors === "number") {
    sessionData.errors = options.errors;
  }

  // Set status if provided
  if (options.status) {
    sessionData.status = options.status;
  }
}

module.exports = populateSessionData;
