/**
 * Creates an AWS SigV4 authentication scheme configuration for the Bedrock service.
 *
 * @param {Object} options - Configuration options for the authentication scheme.
 * @param {string} options.region - The AWS region to use for signing requests.
 * @returns {Object} An object representing the SigV4 authentication scheme configuration for Bedrock.
 */
function createSigV4BedrockAuthScheme(options) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
    schemeId: "aws.auth#sigv4",
    // Default signing properties for Bedrock
    signingProperties: {
      name: "bedrock",
      region: options.region
    },
    /**
     * Extracts signing properties from the provided configuration and context.
     *
     * @param {Object} config - The configuration object for signing.
     * @param {Object} context - The context in which signing occurs.
     * @returns {Object} An object containing the signing properties.
     */
    propertiesExtractor: (config, context) => ({
      signingProperties: {
        config,
        context
      }
    })
  };
}

module.exports = createSigV4BedrockAuthScheme;