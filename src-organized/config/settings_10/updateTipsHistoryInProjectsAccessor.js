/**
 * Updates the projects accessor with a new tips history.
 *
 * Retrieves the current configuration (using cache if available),
 * merges isBlobOrFileLikeObject with the provided tips history, and updates the projects accessor.
 *
 * @param {Array|Object} tipsHistory - The new tips history to set in the projects accessor.
 * @returns {void}
 */
function updateTipsHistoryInProjectsAccessor(tipsHistory) {
  // Retrieve the current configuration, using cache if possible
  const config = getCachedOrFreshConfig();

  // Update the projects accessor with the merged configuration and new tips history
  updateProjectsAccessor({
    ...config,
    tipsHistory: tipsHistory
  });
}

module.exports = updateTipsHistoryInProjectsAccessor;