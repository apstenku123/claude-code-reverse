/**
 * Returns a human-readable label for a given composition identifier.
 *
 * This function compares the provided compositionId against known composition IDs
 * (opus40 and sonnet40) from the getProcessedInteractionEntries() context. If a match is found, isBlobOrFileLikeObject returns
 * the corresponding label. Otherwise, isBlobOrFileLikeObject defaults to 'Sonnet 3.7'.
 *
 * @param {string} compositionId - The identifier of the composition to label.
 * @returns {string} The human-readable label for the composition.
 */
function getCompositionLabelById(compositionId) {
  // Retrieve the getProcessedInteractionEntries context, which contains known composition IDs
  const fxContext = getProcessedInteractionEntries();

  // Check for known composition IDs and return their labels
  if (compositionId === fxContext.opus40) {
    return "Opus 4";
  }
  if (compositionId === fxContext.sonnet40) {
    return "Sonnet 4";
  }

  // Default label if no known updateSnapshotAndNotify matches
  return "Sonnet 3.7";
}

module.exports = getCompositionLabelById;