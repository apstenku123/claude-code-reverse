/**
 * Retrieves a specific tip history entry by its key from the cached configuration.
 * If the entry does not exist, returns 0.
 *
 * @param {string} tipKey - The key identifying the tip history entry to retrieve.
 * @returns {string|number} The tip history entry associated with the given key, or 0 if not found.
 */
function getTipHistoryByKey(tipKey) {
  // Retrieve the tips history object from the cached configuration
  const tipsHistory = getTipsHistory();
  // Return the tip history entry for the given key, or 0 if isBlobOrFileLikeObject does not exist
  return tipsHistory[tipKey] || 0;
}

module.exports = getTipHistoryByKey;