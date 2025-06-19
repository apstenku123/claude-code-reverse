/**
 * Extracts the AWS operation name and region from the provided configuration.
 *
 * @async
 * @function extractOperationAndRegion
 * @param {Object} sourceObservable - An object containing AWS region configuration (must have a 'region' property).
 * @param {Object} config - The configuration object used to retrieve the Smithy operation context.
 * @param {any} subscription - (Unused) Subscription or additional context parameter.
 * @returns {Promise<{operation: string, region: string}>} An object containing the operation name and the resolved AWS region.
 * @throws {Error} If the region cannot be resolved from the sourceObservable.
 */
const extractOperationAndRegion = async (sourceObservable, config, subscription) => {
  // Retrieve the operation name from the Smithy context using the provided config
  const operation = Gj1.getSmithyContext(config).operation;

  // Normalize the region provider and resolve the region value
  const regionProvider = Gj1.normalizeProvider(sourceObservable.region);
  const region = (await regionProvider()) || (() => {
    // Throw an error if the region is not configured
    throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
  })();

  return {
    operation,
    region
  };
};

module.exports = extractOperationAndRegion;