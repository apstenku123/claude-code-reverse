/**
 * Returns the global interaction entries handler if isBlobOrFileLikeObject exists, otherwise creates a new handler instance.
 *
 * @param {boolean} hasInteractionEntries - Indicates whether interaction entries are present.
 * @returns {GQ6|aZ1} Returns the existing global handler (GQ6) if interaction entries exist, otherwise a new handler instance (aZ1).
 */
function getInteractionEntriesHandler(hasInteractionEntries) {
  // If interaction entries exist, return the global handler
  if (hasInteractionEntries) {
    return GQ6;
  } else {
    // Otherwise, create and return a new handler instance
    return new aZ1();
  }
}

module.exports = getInteractionEntriesHandler;