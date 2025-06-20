/**
 * Creates an AWS SigV4 authentication scheme configuration object for use with AWS SSO Portal.
 *
 * @param {Object} sourceOptions - The options object containing AWS region information.
 * @param {string} sourceOptions.region - The AWS region to use for signing.
 * @returns {Object} An object describing the AWS SigV4 authentication scheme, including signing properties and a properties extractor function.
 */
function createAwsSigV4AuthScheme(sourceOptions) {
  return {
    // Identifier for the AWS SigV4 authentication scheme
    schemeId: "aws.auth#sigv4",
    // Default signing properties for the SSO Portal
    signingProperties: {
      name: "awsssoportal",
      region: sourceOptions.region
    },
    /**
     * Extracts signing properties from the provided configuration and context.
     *
     * @param {Object} config - The configuration object to be used for signing.
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

module.exports = createAwsSigV4AuthScheme;