/**
 * Retrieves the 'tipsHistory' property from the cached or fresh configuration object.
 * If 'tipsHistory' does not exist, returns an empty object.
 *
 * @returns {Object} The tips history object from the configuration, or an empty object if not present.
 */
function getTipsHistoryFromConfig() {
  // Retrieve the configuration object, using cache if possible
  const config = getCachedOrFreshConfig();
  // Return the 'tipsHistory' property if isBlobOrFileLikeObject exists, otherwise return an empty object
  return config.tipsHistory || {};
}

module.exports = getTipsHistoryFromConfig;