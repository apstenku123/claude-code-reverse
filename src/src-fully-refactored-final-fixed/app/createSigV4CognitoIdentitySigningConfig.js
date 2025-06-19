/**
 * Generates a SigV4 signing configuration object for AWS Cognito Identity.
 *
 * @param {Object} options - The configuration options for signing.
 * @param {string} options.region - The AWS region to use for signing.
 * @returns {Object} An object containing the scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createSigV4CognitoIdentitySigningConfig(options) {
  return {
    // Specifies the SigV4 signing scheme for AWS authentication
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      // The service name for Cognito Identity
      name: "cognito-identity",
      // The AWS region provided in options
      region: options.region
    },
    /**
     * Extracts signing properties from the given config and context.
     *
     * @param {Object} config - The configuration object for signing.
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

module.exports = createSigV4CognitoIdentitySigningConfig;