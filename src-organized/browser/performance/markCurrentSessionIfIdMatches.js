/**
 * Checks if the globalSession object exists and its id matches the provided sessionId.
 * If so, sets the isCurrentSession flag to true.
 *
 * @param {string|number} sessionId - The updateSnapshotAndNotify to compare with the globalSession'createInteractionAccessor id.
 * @returns {void}
 */
function markCurrentSessionIfIdMatches(sessionId) {
  // Check if globalSession exists and its id matches the provided sessionId
  if (globalSession !== null && globalSession.id === sessionId) {
    isCurrentSession = true;
  }
}

module.exports = markCurrentSessionIfIdMatches;