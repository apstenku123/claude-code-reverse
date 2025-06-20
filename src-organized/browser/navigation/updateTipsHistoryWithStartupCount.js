/**
 * Updates the application'createInteractionAccessor tips history with the current number of startups for a given key.
 *
 * @param {string} tipsHistoryKey - The key representing the tips history entry to update.
 * @returns {void}
 *
 * This function retrieves the current tips history object from the application'createInteractionAccessor configuration,
 * updates the entry corresponding to the provided key with the latest startup count from the configuration,
 * and then persists the updated tips history.
 */
function updateTipsHistoryWithStartupCount(tipsHistoryKey) {
  // Retrieve the current tips history object (or an empty object if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist)
  const tipsHistory = getTipsHistory();
  // Get the current number of startups from the configuration
  const numStartups = getCachedOrFreshConfig().numStartups;
  // Update the tips history for the given key with the current startup count
  tipsHistory[tipsHistoryKey] = numStartups;
  // Persist the updated tips history
  updateTipsHistoryInAccessor(tipsHistory);
}

module.exports = updateTipsHistoryWithStartupCount;