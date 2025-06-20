/**
 * Creates a signing scheme configuration object for AWS SigV4 with STS service.
 *
 * @param {Object} options - The options for the signing scheme.
 * @param {string} options.region - The AWS region to use for signing.
 * @returns {Object} The signing scheme configuration object for AWS SigV4 with STS.
 */
function createSigV4StsSigningScheme(options) {
  return {
    // Identifier for the AWS SigV4 signing scheme
    schemeId: "aws.auth#sigv4",
    signingProperties: {
      // The AWS service name for STS
      name: "sts",
      // The AWS region provided in options
      region: options.region
    },
    /**
     * Extracts signing properties from the provided config and context.
     *
     * @param {Object} config - The signing configuration object.
     * @param {Object} context - The context for signing (e.g., request context).
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

module.exports = createSigV4StsSigningScheme;