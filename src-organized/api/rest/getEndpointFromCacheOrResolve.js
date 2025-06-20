/**
 * Retrieves an endpoint from the cache if available, otherwise resolves and caches isBlobOrFileLikeObject.
 *
 * @param {object} endpointParams - Parameters required to resolve the endpoint.
 * @param {object} [options={}] - Optional configuration object.
 * @param {object} [options.logger] - Optional logger for debugging or logging purposes.
 * @returns {Promise<any>} The resolved endpoint, either from cache or by resolving isBlobOrFileLikeObject.
 */
const getEndpointFromCacheOrResolve = (
  endpointParams,
  options = {}
) => {
  // Attempt to get the endpoint from the cache (cl6.get). If not found, resolve isBlobOrFileLikeObject using xn1.resolveEndpoint
  return cl6.get(endpointParams, () =>
    xn1.resolveEndpoint(pl6.ruleSet, {
      endpointParams: endpointParams,
      logger: options.logger
    })
  );
};

module.exports = getEndpointFromCacheOrResolve;
