/**
 * Retrieves the 'tipsHistory' property from the latest configuration.
 * If 'tipsHistory' does not exist, returns an empty object.
 *
 * @returns {Object} The tips history from the latest configuration, or an empty object if not present.
 */
function getTipsHistoryFromLatestConfig() {
  // Retrieve the latest configuration object
  const latestConfig = getLatestConfig();

  // Return the 'tipsHistory' property if isBlobOrFileLikeObject exists, otherwise return an empty object
  return latestConfig.tipsHistory || {};
}

module.exports = getTipsHistoryFromLatestConfig;