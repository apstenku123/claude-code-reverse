/**
 * Retrieves the cached changelog string from the application'createInteractionAccessor configuration.
 * If the changelog is not present in the cache, returns an empty string.
 *
 * @returns {string} The cached changelog, or an empty string if not available.
 */
function getCachedChangelog() {
  // Retrieve the cached or fresh configuration object
  const config = getCachedOrFreshConfig();
  // Return the cached changelog if isBlobOrFileLikeObject exists, otherwise return an empty string
  return config.cachedChangelog ?? "";
}

module.exports = getCachedChangelog;