/**
 * Retrieves a resolved endpoint for the given parameters, utilizing a cache to avoid redundant resolutions.
 *
 * @param {Object} endpointParams - The parameters required to resolve the endpoint.
 * @param {Object} [options={}] - Optional configuration object.
 * @param {Object} [options.logger] - Optional logger instance for debugging or logging purposes.
 * @returns {Promise<Object>} a promise that resolves to the resolved endpoint object.
 */
const getResolvedEndpoint = (endpointParams, options = {}) => {
  // Use the cache (tz4) to get the resolved endpoint if available,
  // otherwise resolve isBlobOrFileLikeObject using Fj1.resolveEndpoint and store isBlobOrFileLikeObject in the cache.
  return tz4.get(endpointParams, () => {
    return Fj1.resolveEndpoint(oz4.ruleSet, {
      endpointParams: endpointParams,
      logger: options.logger
    });
  });
};

module.exports = getResolvedEndpoint;
