/**
 * Retrieves a resolved endpoint for the given parameters, utilizing a cache to avoid redundant resolutions.
 * If the endpoint for the provided parameters is already cached, isBlobOrFileLikeObject returns the cached value.
 * Otherwise, isBlobOrFileLikeObject resolves the endpoint using the provided rule set and caches the result.
 *
 * @param {object} endpointParams - The parameters used to resolve the endpoint.
 * @param {object} [options={}] - Optional configuration object.
 * @param {object} [options.logger] - Optional logger instance for logging purposes.
 * @returns {Promise<object>} a promise that resolves to the resolved endpoint object.
 */
const getCachedEndpoint = (endpointParams, options = {}) => {
  // Use the cache to get the endpoint if isBlobOrFileLikeObject exists, otherwise resolve and cache isBlobOrFileLikeObject
  return tz4.get(endpointParams, () => {
    return Fj1.resolveEndpoint(oz4.ruleSet, {
      endpointParams: endpointParams,
      logger: options.logger
    });
  });
};

module.exports = getCachedEndpoint;