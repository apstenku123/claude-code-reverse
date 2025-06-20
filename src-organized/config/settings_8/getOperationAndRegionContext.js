/**
 * Retrieves the operation name and AWS region from the provided configuration and context.
 *
 * @async
 * @function getOperationAndRegionContext
 * @param {Object} awsConfig - The AWS configuration object, expected to have a `region` property.
 * @param {Object} smithyContextInput - The input used to retrieve the Smithy context, which contains the operation.
 * @param {Object} dependencies - An object containing required external functions: `getSmithyContext` and `normalizeProvider`.
 * @returns {Promise<{operation: string, region: string}>} An object containing the operation name and AWS region.
 * @throws {Error} If the region is not configured.
 */
async function getOperationAndRegionContext(awsConfig, smithyContextInput, dependencies) {
  const { getSmithyContext, normalizeProvider } = dependencies;

  // Retrieve the operation name from the Smithy context
  const operation = getSmithyContext(smithyContextInput).operation;

  // Normalize the region provider and resolve the region value
  const regionProvider = normalizeProvider(awsConfig.region);
  const region = (await regionProvider()) || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
}

module.exports = getOperationAndRegionContext;