/**
 * Populates and normalizes a session event object with data from a configuration object.
 * Ensures required fields are set, applies defaults, and normalizes values for analytics/session tracking.
 *
 * @param {Object} eventData - The session event object to populate and normalize. Mutated in place.
 * @param {Object} [options={}] - Optional configuration object providing additional data.
 * @param {Object} [options.user] - User information (may include id, email, username, ip_address).
 * @param {string} [options.did] - Device or user identifier override.
 * @param {number} [options.timestamp] - Timestamp for the event (seconds since epoch).
 * @param {string} [options.abnormal_mechanism] - Abnormal mechanism flag.
 * @param {boolean} [options.ignoreDuration] - If true, duration will be ignored.
 * @param {string} [options.sid] - Session updateSnapshotAndNotify(should be 32 chars, otherwise a new UUID is generated).
 * @param {boolean} [options.init] - Indicates if this is the initial session event.
 * @param {number} [options.started] - Timestamp when the session started.
 * @param {number} [options.duration] - Duration override for the session.
 * @param {string} [options.release] - Release version.
 * @param {string} [options.environment] - Environment name.
 * @param {string} [options.ipAddress] - IP address override.
 * @param {string} [options.userAgent] - User agent string.
 * @param {number} [options.errors] - Number of errors in the session.
 * @param {string} [options.status] - Status of the session.
 * @returns {void}
 */
function populateSessionEventData(eventData, options = {}) {
  // Populate user-related fields if user info is provided
  if (options.user) {
    // Set IP address from user if not already present
    if (!eventData.ipAddress && options.user.ip_address) {
      eventData.ipAddress = options.user.ip_address;
    }
    // Set device/user identifier if not already present
    if (!eventData.did && !options.did) {
      eventData.did = options.user.id || options.user.email || options.user.username;
    }
  }

  // Set timestamp (from options or current time)
  eventData.timestamp = options.timestamp || Yc.timestampInSeconds();

  // Set abnormal mechanism if provided
  if (options.abnormal_mechanism) {
    eventData.abnormal_mechanism = options.abnormal_mechanism;
  }

  // Set ignoreDuration flag if provided
  if (options.ignoreDuration) {
    eventData.ignoreDuration = options.ignoreDuration;
  }

  // Set session updateSnapshotAndNotify, generate a new one if invalid
  if (options.sid) {
    eventData.sid = options.sid.length === 32 ? options.sid : Yc.uuid4();
  }

  // Set init flag if provided
  if (options.init !== undefined) {
    eventData.init = options.init;
  }

  // Set device/user identifier from options if not already present
  if (!eventData.did && options.did) {
    eventData.did = String(options.did);
  }

  // Set session started timestamp if provided
  if (typeof options.started === "number") {
    eventData.started = options.started;
  }

  // Handle duration logic
  if (eventData.ignoreDuration) {
    // If ignoreDuration is true, unset duration
    eventData.duration = undefined;
  } else if (typeof options.duration === "number") {
    // Use provided duration if valid
    eventData.duration = options.duration;
  } else {
    // Otherwise, calculate duration from timestamps
    const calculatedDuration = eventData.timestamp - eventData.started;
    eventData.duration = calculatedDuration >= 0 ? calculatedDuration : 0;
  }

  // Set release version if provided
  if (options.release) {
    eventData.release = options.release;
  }

  // Set environment if provided
  if (options.environment) {
    eventData.environment = options.environment;
  }

  // Set IP address from options if not already present
  if (!eventData.ipAddress && options.ipAddress) {
    eventData.ipAddress = options.ipAddress;
  }

  // Set user agent if provided and not already present
  if (!eventData.userAgent && options.userAgent) {
    eventData.userAgent = options.userAgent;
  }

  // Set error count if provided
  if (typeof options.errors === "number") {
    eventData.errors = options.errors;
  }

  // Set session status if provided
  if (options.status) {
    eventData.status = options.status;
  }
}

module.exports = populateSessionEventData;