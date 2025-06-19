/**
 * Creates an AWS SigV4 authentication scheme configuration for Cognito Identity.
 *
 * @param {Object} options - The options object containing region information.
 * @param {string} options.region - The AWS region to use for signing.
 * @returns {Object} An object representing the SigV4 authentication scheme configuration.
 */
function createSigV4CognitoIdentityAuthScheme(options) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
    schemeId: "aws.auth#sigv4",
    // Properties required for signing requests
    signingProperties: {
      name: "cognito-identity",
      region: options.region
    },
    /**
     * Extracts signing properties from the provided config and context.
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

module.exports = createSigV4CognitoIdentityAuthScheme;