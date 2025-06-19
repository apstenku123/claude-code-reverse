/**
 * Resolves the AWS operation context and region for a given configuration.
 *
 * @async
 * @function resolveOperationAndRegionContext
 * @param {Object} awsConfig - The AWS configuration object, must include a 'region' property or provider.
 * @param {Object} smithyContextInput - The input used to obtain the Smithy context (e.g., command input or client config).
 * @param {Object} smithyContextProvider - An object providing 'getSmithyContext' and 'normalizeProvider' methods.
 * @returns {Promise<{operation: string, region: string}>} An object containing the resolved operation name and region.
 * @throws {Error} If the region cannot be resolved from the configuration.
 */
async function resolveOperationAndRegionContext(awsConfig, smithyContextInput, smithyContextProvider) {
  // Retrieve the operation name from the Smithy context
  const operation = smithyContextProvider.getSmithyContext(smithyContextInput).operation;

  // Normalize and resolve the region provider, then invoke isBlobOrFileLikeObject to get the region string
  const regionProvider = smithyContextProvider.normalizeProvider(awsConfig.region);
  const region = (await regionProvider()) || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
}

module.exports = resolveOperationAndRegionContext;
