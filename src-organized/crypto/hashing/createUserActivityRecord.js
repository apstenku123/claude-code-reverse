/**
 * Creates a user activity record object containing source, data, timestamp, stable updateSnapshotAndNotify, and full user hash.
 *
 * @param {any} source - The source of the activity, typically the result of mapping user interactions to routes.
 * @param {any} activityData - The activity data, usually processed by addActivityIfNotFinished.
 * @param {any} stableId - a stable identifier for the activity, such as a random number or unique key.
 * @param {any} userIdentifier - The user identifier used to generate a full user hash.
 * @returns {Object} An object representing the user activity record with metadata.
 */
function createUserActivityRecord(source, activityData, stableId, userIdentifier) {
  return {
    source: source, // The mapped source of the activity
    data: activityData, // The activity data object
    receivedAt: Date.now(), // Timestamp when the record is created
    stableID: stableId, // Stable identifier for this activity
    fullUserHash: Y61._getFullUserHash(userIdentifier) // Full user hash for tracking
  };
}

module.exports = createUserActivityRecord;