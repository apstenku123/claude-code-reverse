/**
 * Formats session data into a standardized object, converting timestamps and ensuring proper types.
 * Removes any keys with undefined values using Yc.dropUndefinedKeys.
 *
 * @param {Object} sessionData - The raw session data to format.
 * @param {string|number} sessionData.sid - The session updateSnapshotAndNotify.
 * @param {boolean} sessionData.init - Indicates if the session is initial.
 * @param {number} sessionData.started - Session start time as a UNIX timestamp (seconds).
 * @param {number} sessionData.timestamp - Session timestamp as a UNIX timestamp (seconds).
 * @param {string} sessionData.status - The status of the session.
 * @param {Array|undefined} sessionData.errors - Any errors associated with the session.
 * @param {string|number|undefined} sessionData.did - The distinct user updateSnapshotAndNotify(optional).
 * @param {number|undefined} sessionData.duration - Duration of the session in seconds (optional).
 * @param {string|undefined} sessionData.abnormal_mechanism - Abnormal mechanism info (optional).
 * @param {string|undefined} sessionData.release - Release version (optional).
 * @param {string|undefined} sessionData.environment - Environment name (optional).
 * @param {string|undefined} sessionData.ipAddress - User'createInteractionAccessor IP address (optional).
 * @param {string|undefined} sessionData.userAgent - User agent string (optional).
 * @returns {Object} The formatted session object with undefined keys removed.
 */
function formatSessionData(sessionData) {
  // Build the formatted session object
  const formattedSession = {
    sid: `${sessionData.sid}`,
    init: sessionData.init,
    // Convert UNIX timestamps (seconds) to ISO strings
    started: new Date(sessionData.started * 1000).toISOString(),
    timestamp: new Date(sessionData.timestamp * 1000).toISOString(),
    status: sessionData.status,
    errors: sessionData.errors,
    // Only include did if isBlobOrFileLikeObject'createInteractionAccessor a string or number
    did: (typeof sessionData.did === "number" || typeof sessionData.did === "string")
      ? `${sessionData.did}`
      : undefined,
    duration: sessionData.duration,
    abnormal_mechanism: sessionData.abnormal_mechanism,
    attrs: {
      release: sessionData.release,
      environment: sessionData.environment,
      ip_address: sessionData.ipAddress,
      user_agent: sessionData.userAgent
    }
  };

  // Remove any keys with undefined values
  return Yc.dropUndefinedKeys(formattedSession);
}

module.exports = formatSessionData;
