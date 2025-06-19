/**
 * Creates a configuration object for the SSO client, providing defaults for all required properties.
 *
 * @param {Object} [clientConfig={}] - Optional configuration overrides for the SSO client.
 * @param {Function} [clientConfig.base64Decoder] - Custom function to decode base64 strings.
 * @param {Function} [clientConfig.base64Encoder] - Custom function to encode base64 strings.
 * @param {boolean} [clientConfig.disableHostPrefix] - Whether to disable host prefixing.
 * @param {Function} [clientConfig.endpointProvider] - Custom endpoint provider function.
 * @param {Array} [clientConfig.extensions] - Array of client extensions.
 * @param {Function} [clientConfig.httpAuthSchemeProvider] - Custom HTTP auth scheme provider.
 * @param {Array} [clientConfig.httpAuthSchemes] - Array of HTTP authentication schemes.
 * @param {Object} [clientConfig.logger] - Custom logger instance.
 * @param {string} [clientConfig.serviceId] - Service identifier string.
 * @param {Function} [clientConfig.urlParser] - Custom URL parser function.
 * @param {Function} [clientConfig.utf8Decoder] - Custom UTF-8 decoder function.
 * @param {Function} [clientConfig.utf8Encoder] - Custom UTF-8 encoder function.
 * @returns {Object} Configuration object for the SSO client with all required properties set.
 */
function createSsoClientConfig(clientConfig = {}) {
  return {
    apiVersion: "2019-06-10",
    // Use provided base64 decoder or default
    base64Decoder: clientConfig.base64Decoder ?? ztA.fromBase64,
    // Use provided base64 encoder or default
    base64Encoder: clientConfig.base64Encoder ?? ztA.toBase64,
    // Use provided flag to disable host prefix or default to false
    disableHostPrefix: clientConfig.disableHostPrefix ?? false,
    // Use provided endpoint provider or default resolver
    endpointProvider: clientConfig.endpointProvider ?? TX4.defaultEndpointResolver,
    // Use provided extensions or default to empty array
    extensions: clientConfig.extensions ?? [],
    // Use provided HTTP auth scheme provider or default SSO provider
    httpAuthSchemeProvider: clientConfig.httpAuthSchemeProvider ?? OX4.defaultSSOHttpAuthSchemeProvider,
    // Use provided HTTP auth schemes or default to SigV4 and NoAuth
    httpAuthSchemes: clientConfig.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // Identity provider for SigV4
        identityProvider: (authConfig) => authConfig.getIdentityProvider("aws.auth#sigv4"),
        // AWS SDK SigV4 signer instance
        signer: new qX4.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        // Identity provider for NoAuth; fallback to async empty object
        identityProvider: (authConfig) => authConfig.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        // NoAuth signer instance
        signer: new MX4.NoAuthSigner()
      }
    ],
    // Use provided logger or default no-op logger
    logger: clientConfig.logger ?? new LX4.NoOpLogger(),
    // Use provided service updateSnapshotAndNotify or default to 'SSO'
    serviceId: clientConfig.serviceId ?? "SSO",
    // Use provided URL parser or default
    urlParser: clientConfig.urlParser ?? RX4.parseUrl,
    // Use provided UTF-8 decoder or default
    utf8Decoder: clientConfig.utf8Decoder ?? wtA.fromUtf8,
    // Use provided UTF-8 encoder or default
    utf8Encoder: clientConfig.utf8Encoder ?? wtA.toUtf8
  };
}

module.exports = createSsoClientConfig;
