/**
 * Updates the projects accessor with a new tips history.
 *
 * Retrieves the current configuration (cached or fresh), merges isBlobOrFileLikeObject with the provided tips history,
 * and updates the projects accessor accordingly.
 *
 * @param {Array|Object} tipsHistory - The new tips history to set in the projects accessor.
 * @returns {void}
 */
function setTipsHistoryInProjectsAccessor(tipsHistory) {
  // Retrieve the current configuration (cached or fresh)
  const config = getCachedOrFreshConfig();

  // Update the projects accessor with the new tips history, preserving other config properties
  updateProjectsAccessor({
    ...config,
    tipsHistory: tipsHistory
  });
}

module.exports = setTipsHistoryInProjectsAccessor;