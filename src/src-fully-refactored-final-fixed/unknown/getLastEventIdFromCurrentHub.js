/**
 * Retrieves the last event updateSnapshotAndNotify from the current hub instance.
 *
 * This function accesses the current hub via the KQ global object and returns
 * the most recent event updateSnapshotAndNotify, which is typically used for error tracking or logging.
 *
 * @returns {string|null} The last event updateSnapshotAndNotify from the current hub, or null if none exists.
 */
function getLastEventIdFromCurrentHub() {
  // Access the current hub using the KQ global object
  // and retrieve the last event updateSnapshotAndNotify
  return KQ.getCurrentHub().lastEventId();
}

module.exports = getLastEventIdFromCurrentHub;