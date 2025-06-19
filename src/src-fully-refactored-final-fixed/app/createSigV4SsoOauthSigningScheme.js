/**
 * Creates a signing scheme configuration object for AWS SigV4 with SSO OAuth.
 *
 * @param {Object} options - The options for the signing scheme.
 * @param {string} options.region - The AWS region to use for signing.
 * @returns {Object} The signing scheme configuration object for AWS SigV4 SSO OAuth.
 */
function createSigV4SsoOauthSigningScheme(options) {
  return {
    // Identifier for the signing scheme
    schemeId: "aws.auth#sigv4",
    // Properties required for signing
    signingProperties: {
      name: "sso-oauth",
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

module.exports = createSigV4SsoOauthSigningScheme;