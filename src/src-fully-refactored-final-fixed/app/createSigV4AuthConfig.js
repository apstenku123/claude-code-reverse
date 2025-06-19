/**
 * Creates a configuration object for AWS SigV4 authentication, specifically for the 'bedrock' service.
 *
 * @param {Object} sourceObservable - An object containing AWS region information.
 * @param {string} sourceObservable.region - The AWS region to use for signing.
 * @returns {Object} An object containing the SigV4 scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createSigV4AuthConfig(sourceObservable) {
  return {
    // AWS SigV4 authentication scheme identifier
    schemeId: "aws.auth#sigv4",
    // Default signing properties for the 'bedrock' service
    signingProperties: {
      name: "bedrock",
      region: sourceObservable.region
    },
    /**
     * Extracts signing properties from the provided configuration and context.
     *
     * @param {Object} config - The configuration object for signing.
     * @param {Object} subscription - The context or subscription information.
     * @returns {Object} An object containing signing properties with config and context.
     */
    propertiesExtractor: (config, subscription) => ({
      signingProperties: {
        config: config,
        context: subscription
      }
    })
  };
}

module.exports = createSigV4AuthConfig;