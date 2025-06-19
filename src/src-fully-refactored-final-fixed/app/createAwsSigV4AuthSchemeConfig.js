/**
 * Creates a configuration object for AWS SigV4 authentication scheme for Bedrock service.
 *
 * @param {Object} options - Options for configuring the signing scheme.
 * @param {string} options.region - The AWS region to use for signing requests.
 * @returns {Object} An object containing the scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createAwsSigV4AuthSchemeConfig(options) {
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
     * @param {Object} config - The configuration object for signing.
     * @param {Object} context - The context in which signing occurs.
     * @returns {Object} An object containing signingProperties with config and context.
     */
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config: config,
        context: context
      }
    })
  };
}

module.exports = createAwsSigV4AuthSchemeConfig;