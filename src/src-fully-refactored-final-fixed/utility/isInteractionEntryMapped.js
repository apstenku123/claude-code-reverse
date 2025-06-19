/**
 * Checks if the given interaction entry updateSnapshotAndNotify exists in the mapped interaction entries.
 *
 * @param {string} interactionEntryId - The unique identifier for the interaction entry to check.
 * @returns {boolean} True if the interaction entry updateSnapshotAndNotify is present in the mapping; otherwise, false.
 */
function isInteractionEntryMapped(interactionEntryId) {
  // $D2 is assumed to be an external mapping of interaction entry IDs to route information
  return $D2[interactionEntryId] !== undefined;
}

module.exports = isInteractionEntryMapped;