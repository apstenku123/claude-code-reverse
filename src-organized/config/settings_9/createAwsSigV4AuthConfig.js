/**
 * Creates an AWS SigV4 authentication configuration object for use with Bedrock services.
 *
 * @param {Object} options - The configuration options for authentication.
 * @param {string} options.region - The AWS region to use for signing requests.
 * @returns {Object} An object containing the SigV4 scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createAwsSigV4AuthConfig(options) {
  return {
    // Identifies the authentication scheme as AWS SigV4
    schemeId: "aws.auth#sigv4",
    // Default signing properties for Bedrock
    signingProperties: {
      name: "bedrock",
      region: options.region
    },
    /**
     * Extracts signing properties from the provided config and context.
     *
     * @param {Object} config - The configuration object for signing.
     * @param {Object} context - The context in which signing occurs.
     * @returns {Object} An object containing the signing properties.
     */
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config: config,
        context: context
      }
    })
  };
}

module.exports = createAwsSigV4AuthConfig;