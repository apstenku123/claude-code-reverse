/**
 * Resolves the AWS operation and region from the provided configuration and context.
 *
 * @async
 * @function resolveOperationAndRegion
 * @param {Object} clientConfig - The client configuration object, expected to have a `region` property.
 * @param {Object} middlewareContext - The middleware context object used to extract the operation.
 * @param {Object} smithyContextProvider - The context provider containing AWS utility functions.
 * @returns {Promise<{operation: string, region: string}>} An object containing the AWS operation name and resolved region.
 * @throws {Error} If the region cannot be resolved from the configuration.
 */
const resolveOperationAndRegion = async (
  clientConfig,
  middlewareContext,
  smithyContextProvider
) => {
  // Extract the operation name from the middleware context using the Smithy context provider
  const operation = smithyContextProvider.getSmithyContext(middlewareContext).operation;

  // Attempt to resolve the region using the normalizeProvider utility
  const regionProvider = smithyContextProvider.normalizeProvider(clientConfig.region);
  const region = (await regionProvider()) || (() => {
    // If region is not configured, throw a descriptive error
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
};

module.exports = resolveOperationAndRegion;