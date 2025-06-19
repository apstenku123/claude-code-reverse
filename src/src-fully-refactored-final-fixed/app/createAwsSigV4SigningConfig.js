/**
 * Creates a configuration object for AWS SigV4 authentication, specifically for the 'bedrock' service.
 *
 * @param {Object} sourceObservable - The source object containing AWS region information.
 * @param {string} sourceObservable.region - The AWS region to be used for signing.
 * @returns {Object} An object containing the SigV4 scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createAwsSigV4SigningConfig(sourceObservable) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
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
     * @param {Object} context - The context in which signing occurs.
     * @returns {Object} An object containing signing properties with config and context.
     */
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config: config,
        context: context
      }
    })
  };
}

module.exports = createAwsSigV4SigningConfig;
