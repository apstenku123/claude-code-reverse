/**
 * Retrieves the operation name from the Smithy context and resolves the AWS region configuration.
 * Throws an error if the region is not configured.
 *
 * @async
 * @param {object} awsConfig - The AWS configuration object, expected to have a `region` property (can be a provider).
 * @param {object} smithyContextInput - The input used to retrieve the Smithy context (e.g., request context).
 * @param {any} subscription - Unused parameter, reserved for future use or compatibility.
 * @returns {Promise<{operation: string, region: string}>} An object containing the operation name and resolved region.
 * @throws {Error} If the region cannot be resolved.
 */
async function getOperationAndRegionConfig(awsConfig, smithyContextInput, subscription) {
  // Retrieve the operation name from the Smithy context
  const operation = u_1.getSmithyContext(smithyContextInput).operation;

  // Normalize the region provider and resolve the region value
  const regionProvider = u_1.normalizeProvider(awsConfig.region);
  const region = (await regionProvider()) || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
}

module.exports = getOperationAndRegionConfig;
