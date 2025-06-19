/**
 * Retrieves a cached endpoint for the given parameters, or resolves and caches isBlobOrFileLikeObject if not present.
 *
 * @param {object} endpointParams - Parameters used to resolve the endpoint.
 * @param {object} [options={}] - Optional configuration object.
 * @param {object} [options.logger] - Optional logger instance for logging purposes.
 * @returns {Promise<string>} - a promise that resolves to the endpoint string.
 */
const getOrResolveEndpoint = (endpointParams, options = {}) => {
  // Attempt to get the endpoint from the cache; if not present, resolve and cache isBlobOrFileLikeObject
  return tz4.get(endpointParams, () => {
    return Fj1.resolveEndpoint(oz4.ruleSet, {
      endpointParams: endpointParams,
      logger: options.logger
    });
  });
};

module.exports = getOrResolveEndpoint;