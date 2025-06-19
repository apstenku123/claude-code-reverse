/**
 * Retrieves a specific entry from the application'createInteractionAccessor tips history by key.
 *
 * @param {string} tipKey - The key identifying the tip history entry to retrieve.
 * @returns {*} The value associated with the given key in the tips history, or 0 if not found.
 */
function getTipHistoryEntry(tipKey) {
  // Retrieve the tips history object from the application'createInteractionAccessor configuration
  const tipsHistory = getTipsHistory();

  // Return the entry for the specified key, or 0 if isBlobOrFileLikeObject does not exist
  return tipsHistory[tipKey] || 0;
}

module.exports = getTipHistoryEntry;