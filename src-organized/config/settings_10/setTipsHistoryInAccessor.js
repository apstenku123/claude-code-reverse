/**
 * Updates the accessor'createInteractionAccessor configuration by setting the tips history.
 *
 * Retrieves the current configuration (from cache or fresh),
 * merges in the provided tips history, and updates the accessor'createInteractionAccessor configuration.
 *
 * @param {Array|Object} tipsHistory - The new tips history to set in the configuration.
 * @returns {void}
 */
function setTipsHistoryInAccessor(tipsHistory) {
  // Retrieve the current configuration (from cache or fresh)
  const config = getCachedOrFreshConfig();

  // Update the accessor'createInteractionAccessor configuration by merging in the new tips history
  updateProjectsAccessor({
    ...config,
    tipsHistory: tipsHistory
  });
}

module.exports = setTipsHistoryInAccessor;