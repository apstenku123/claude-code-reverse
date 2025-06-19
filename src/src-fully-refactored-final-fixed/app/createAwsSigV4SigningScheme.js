/**
 * Creates an AWS SigV4 signing scheme configuration object for use with AWS STS.
 *
 * @param {Object} regionConfig - Configuration object containing the AWS region.
 * @param {string} regionConfig.region - The AWS region to use for signing.
 * @returns {Object} An object containing the signing scheme, signing properties, and a properties extractor function.
 */
function createAwsSigV4SigningScheme(regionConfig) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
    schemeId: "aws.auth#sigv4",
    // Default signing properties for AWS STS
    signingProperties: {
      name: "sts",
      region: regionConfig.region
    },
    /**
     * Extracts signing properties from the provided configuration and context.
     *
     * @param {Object} config - The configuration object to use for signing.
     * @param {Object} context - The context in which signing is performed.
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

module.exports = createAwsSigV4SigningScheme;