/**
 * Creates a configuration object for the SSO OIDC client, filling in defaults where necessary.
 *
 * @param {Object} userConfig - Optional user-provided configuration overrides.
 * @param {Function} [userConfig.base64Decoder] - Custom function to decode base64 strings.
 * @param {Function} [userConfig.base64Encoder] - Custom function to encode base64 strings.
 * @param {boolean} [userConfig.disableHostPrefix] - Whether to disable host prefixing.
 * @param {Function} [userConfig.endpointProvider] - Custom endpoint provider function.
 * @param {Array} [userConfig.extensions] - Array of extension objects.
 * @param {Function} [userConfig.httpAuthSchemeProvider] - Custom HTTP auth scheme provider.
 * @param {Array} [userConfig.httpAuthSchemes] - Array of HTTP authentication schemes.
 * @param {Object} [userConfig.logger] - Logger instance.
 * @param {string} [userConfig.serviceId] - Service identifier.
 * @param {Function} [userConfig.urlParser] - Custom URL parser function.
 * @param {Function} [userConfig.utf8Decoder] - Custom UTF-8 decoder function.
 * @param {Function} [userConfig.utf8Encoder] - Custom UTF-8 encoder function.
 * @returns {Object} Complete configuration object for the SSO OIDC client.
 */
function createSsoOidcClientConfig(userConfig = {}) {
  return {
    apiVersion: "2019-06-10",
    // Use provided base64 decoder or default
    base64Decoder: userConfig.base64Decoder ?? r10.fromBase64,
    // Use provided base64 encoder or default
    base64Encoder: userConfig.base64Encoder ?? r10.toBase64,
    // Use provided flag to disable host prefix or default (false)
    disableHostPrefix: userConfig.disableHostPrefix ?? false,
    // Use provided endpoint provider or default resolver
    endpointProvider: userConfig.endpointProvider ?? ZH4.defaultEndpointResolver,
    // Use provided extensions array or default (empty array)
    extensions: userConfig.extensions ?? [],
    // Use provided HTTP auth scheme provider or default SSO OIDC provider
    httpAuthSchemeProvider: userConfig.httpAuthSchemeProvider ?? GH4.defaultSSOOIDCHttpAuthSchemeProvider,
    // Use provided HTTP auth schemes or default schemes (SigV4 and NoAuth)
    httpAuthSchemes: userConfig.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // Identity provider for SigV4
        identityProvider: (authSchemeContext) => authSchemeContext.getIdentityProvider("aws.auth#sigv4"),
        signer: new AH4.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        // Identity provider for NoAuth (returns empty object if not found)
        identityProvider: (authSchemeContext) => authSchemeContext.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new BH4.NoAuthSigner()
      }
    ],
    // Use provided logger or default no-op logger
    logger: userConfig.logger ?? new QH4.NoOpLogger(),
    // Use provided service updateSnapshotAndNotify or default
    serviceId: userConfig.serviceId ?? "SSO OIDC",
    // Use provided URL parser or default
    urlParser: userConfig.urlParser ?? IH4.parseUrl,
    // Use provided UTF-8 decoder or default
    utf8Decoder: userConfig.utf8Decoder ?? o10.fromUtf8,
    // Use provided UTF-8 encoder or default
    utf8Encoder: userConfig.utf8Encoder ?? o10.toUtf8
  };
}

module.exports = createSsoOidcClientConfig;
