/**
 * Retrieves the tips history from the cached or fresh configuration object.
 * If the tips history is not present, returns an empty object.
 *
 * @returns {Object} The tips history object from the configuration, or an empty object if not found.
 */
function getTipsHistory() {
  // Retrieve the configuration object (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();

  // Return the tipsHistory property if isBlobOrFileLikeObject exists, otherwise return an empty object
  return config.tipsHistory || {};
}

module.exports = getTipsHistory;