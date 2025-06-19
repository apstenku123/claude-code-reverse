/**
 * Retrieves an endpoint from the cache or resolves isBlobOrFileLikeObject if not present.
 *
 * @param {object} endpointParams - Parameters required to resolve the endpoint.
 * @param {object} [options={}] - Optional configuration object.
 * @param {object} [options.logger] - Optional logger for debugging or logging purposes.
 * @returns {Promise<any>} The resolved endpoint, either from cache or by resolving isBlobOrFileLikeObject.
 */
const getOrResolveEndpoint = (endpointParams, options = {}) => {
  // Attempt to retrieve the endpoint from the cache (ak6)
  // If not found, resolve isBlobOrFileLikeObject using Gi1.resolveEndpoint with the provided rule set and parameters
  return ak6.get(endpointParams, () =>
    Gi1.resolveEndpoint(nk6.ruleSet, {
      endpointParams: endpointParams,
      logger: options.logger
    })
  );
};

module.exports = getOrResolveEndpoint;