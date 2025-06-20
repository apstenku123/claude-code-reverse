/**
 * Updates the application'createInteractionAccessor configuration by setting the tips history.
 *
 * This function retrieves the current configuration using getCachedOrFreshConfig(),
 * updates the 'tipsHistory' property with the provided tipsHistory array,
 * and then applies the updated configuration using updateProjectsAccessor().
 *
 * @param {Array} tipsHistory - An array representing the new tips history to be set in the configuration.
 * @returns {void}
 */
function setTipsHistory(tipsHistory) {
  // Retrieve the current configuration object
  const currentConfig = getCachedOrFreshConfig();

  // Update the configuration with the new tips history
  updateProjectsAccessor({
    ...currentConfig,
    tipsHistory: tipsHistory
  });
}

module.exports = setTipsHistory;