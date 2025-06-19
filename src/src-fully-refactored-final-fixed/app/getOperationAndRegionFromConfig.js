/**
 * Retrieves the operation name from the Smithy context and resolves the AWS region from the provided configuration.
 * Throws an error if the region is not configured.
 *
 * @async
 * @param {Object} configSource - The source object containing AWS configuration, expected to have a `region` property.
 * @param {Object} smithyContextInput - The input used to retrieve the Smithy context, which contains the operation name.
 * @param {any} subscription - (Unused) Placeholder for future use or compatibility.
 * @returns {Promise<{operation: string, region: string}>} An object containing the operation name and resolved region.
 * @throws {Error} If the region is not configured.
 */
async function getOperationAndRegionFromConfig(configSource, smithyContextInput, subscription) {
  // Retrieve the operation name from the Smithy context
  const operation = Zn1.getSmithyContext(smithyContextInput).operation;

  // Normalize and resolve the region provider
  const regionProvider = Zn1.normalizeProvider(configSource.region);
  const region = (await regionProvider()) || (() => {
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
}

module.exports = getOperationAndRegionFromConfig;