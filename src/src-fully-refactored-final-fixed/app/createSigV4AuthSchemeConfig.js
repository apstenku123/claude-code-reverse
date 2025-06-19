/**
 * Creates a configuration object for AWS SigV4 authentication scheme specific to the Bedrock service.
 *
 * @param {Object} options - The options for configuring the SigV4 authentication scheme.
 * @param {string} options.region - The AWS region to use for signing.
 * @returns {Object} An object containing the SigV4 scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createSigV4AuthSchemeConfig(options) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
    schemeId: "aws.auth#sigv4",
    // Default signing properties for the Bedrock service
    signingProperties: {
      name: "bedrock",
      region: options.region
    },
    /**
     * Extracts signing properties from the provided configuration and context.
     *
     * @param {Object} config - The configuration object used for signing.
     * @param {Object} context - The context in which signing occurs.
     * @returns {Object} An object containing signing properties.
     */
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config: config,
        context: context
      }
    })
  };
}

module.exports = createSigV4AuthSchemeConfig;