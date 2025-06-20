/**
 * Updates the application'createInteractionAccessor tips history state by merging the current configuration
 * with a new tips history array, then applies the updated configuration.
 *
 * @param {Array} tipsHistory - An array representing the new tips history to be set.
 * @returns {void}
 */
function updateTipsHistory(tipsHistory) {
  // Retrieve the current application configuration/state
  const currentConfig = getCachedOrFreshConfig();

  // Merge the current configuration with the new tips history
  // and update the application state
  updateProjectsAccessor({
    ...currentConfig,
    tipsHistory: tipsHistory
  });
}

module.exports = updateTipsHistory;