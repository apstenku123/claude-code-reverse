/**
 * Creates a signing configuration object for AWS SigV4 with SSO OAuth.
 *
 * @param {Object} sourceObservable - An object containing the AWS region information.
 * @param {string} sourceObservable.region - The AWS region to use for signing.
 * @returns {Object} An object containing the scheme updateSnapshotAndNotify, signing properties, and a properties extractor function.
 */
function createSigV4SsoOAuthSigningConfig(sourceObservable) {
  return {
    // The signing scheme identifier for AWS SigV4
    schemeId: "aws.auth#sigv4",
    // Signing properties specific to SSO OAuth
    signingProperties: {
      name: "sso-oauth",
      region: sourceObservable.region
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

module.exports = createSigV4SsoOAuthSigningConfig;
