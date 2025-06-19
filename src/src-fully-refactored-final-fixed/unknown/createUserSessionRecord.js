/**
 * Creates a user session record object containing source, data, timestamp, stable updateSnapshotAndNotify, and full user hash.
 *
 * @param {any} sourceObservable - The source of the session, typically an observable or event emitter.
 * @param {any} sessionData - The data associated with the session.
 * @param {any} stableSessionId - a stable identifier for the session.
 * @param {any} userIdentifier - The identifier used to generate the full user hash.
 * @returns {object} An object representing the user session record.
 */
function createUserSessionRecord(sourceObservable, sessionData, stableSessionId, userIdentifier) {
  return {
    source: sourceObservable, // The source of the session (e.g., observable)
    data: sessionData,        // Session-specific data
    receivedAt: Date.now(),   // Timestamp of when the record was created
    stableID: stableSessionId, // Stable session identifier
    fullUserHash: Y61._getFullUserHash(userIdentifier) // Full user hash generated from the identifier
  };
}

module.exports = createUserSessionRecord;