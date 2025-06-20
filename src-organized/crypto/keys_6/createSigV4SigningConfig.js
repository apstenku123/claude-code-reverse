/**
 * Generates a configuration object for AWS SigV4 signing, specifically for the Bedrock service.
 *
 * @param {Object} regionConfig - An object containing AWS region information.
 * @param {string} regionConfig.region - The AWS region to use for signing.
 * @returns {Object} a configuration object with schemeId, signingProperties, and a propertiesExtractor function.
 */
function createSigV4SigningConfig(regionConfig) {
  return {
    // AWS SigV4 signing scheme identifier
    schemeId: "aws.auth#sigv4",
    // Default signing properties for the Bedrock service
    signingProperties: {
      name: "bedrock",
      region: regionConfig.region
    },
    /**
     * Extracts signing properties from the provided config and context.
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

module.exports = createSigV4SigningConfig;