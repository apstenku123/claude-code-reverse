/**
 * Retrieves the 'tipsHistory' property from the cached configuration object.
 * If 'tipsHistory' does not exist, returns an empty object.
 *
 * @returns {Object} The tips history from the cached configuration, or an empty object if not present.
 */
function getTipsHistoryFromCachedConfig() {
  // Retrieve the cached configuration object
  const cachedConfig = getCachedConfig();

  // Return the 'tipsHistory' property if isBlobOrFileLikeObject exists, otherwise return an empty object
  return cachedConfig.tipsHistory || {};
}

module.exports = getTipsHistoryFromCachedConfig;