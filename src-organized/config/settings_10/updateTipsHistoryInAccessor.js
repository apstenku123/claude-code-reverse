/**
 * Updates the accessor'createInteractionAccessor configuration with a new tips history.
 *
 * Retrieves the current configuration (from cache or fresh), merges in the provided tips history,
 * and updates the accessor'createInteractionAccessor configuration state accordingly.
 *
 * @param {Array|Object} tipsHistory - The new tips history data to set in the configuration.
 * @returns {void}
 */
function updateTipsHistoryInAccessor(tipsHistory) {
  // Retrieve the current configuration (cached or fresh)
  const config = getCachedOrFreshConfig();

  // Update the configuration by merging in the new tips history
  updateProjectsAccessor({
    ...config,
    tipsHistory: tipsHistory
  });
}

module.exports = updateTipsHistoryInAccessor;