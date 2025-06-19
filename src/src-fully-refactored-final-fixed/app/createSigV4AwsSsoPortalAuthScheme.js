/**
 * Constructs an AWS SigV4 authentication scheme configuration for the SSO Portal.
 *
 * @param {Object} options - Configuration options for the authentication scheme.
 * @param {string} options.region - The AWS region to use for signing.
 * @returns {Object} An object containing the scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createSigV4AwsSsoPortalAuthScheme(options) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
    schemeId: "aws.auth#sigv4",
    // Default signing properties for the SSO Portal
    signingProperties: {
      name: "awsssoportal",
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
        config: config,
        context: context
      }
    })
  };
}

module.exports = createSigV4AwsSsoPortalAuthScheme;