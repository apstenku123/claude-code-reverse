/**
 * Creates a configuration object for the AWS STS (Security Token Service) client.
 * This function merges user-provided configuration options with sensible defaults,
 * ensuring all required properties are present for the STS client to function correctly.
 *
 * @param {Object} userConfig - Partial configuration options to override defaults.
 * @param {Function} [userConfig.base64Decoder] - Optional custom base64 decoder function.
 * @param {Function} [userConfig.base64Encoder] - Optional custom base64 encoder function.
 * @param {boolean} [userConfig.disableHostPrefix] - If true, disables host prefix.
 * @param {Function} [userConfig.endpointProvider] - Optional endpoint provider function.
 * @param {Array} [userConfig.extensions] - Optional array of client extensions.
 * @param {Function} [userConfig.httpAuthSchemeProvider] - Optional HTTP auth scheme provider.
 * @param {Array} [userConfig.httpAuthSchemes] - Optional array of HTTP auth schemes.
 * @param {Object} [userConfig.logger] - Optional logger instance.
 * @param {string} [userConfig.serviceId] - Optional service updateSnapshotAndNotify override.
 * @param {Function} [userConfig.urlParser] - Optional URL parser function.
 * @param {Function} [userConfig.utf8Decoder] - Optional UTF-8 decoder function.
 * @param {Function} [userConfig.utf8Encoder] - Optional UTF-8 encoder function.
 * @returns {Object} Complete configuration object for the STS client.
 */
function createStsClientConfig(userConfig) {
  return {
    apiVersion: "2011-06-15",
    // Use provided base64 decoder or default
    base64Decoder: userConfig?.base64Decoder ?? x00.fromBase64,
    // Use provided base64 encoder or default
    base64Encoder: userConfig?.base64Encoder ?? x00.toBase64,
    // Use provided disableHostPrefix flag or default to false
    disableHostPrefix: userConfig?.disableHostPrefix ?? false,
    // Use provided endpoint provider or default resolver
    endpointProvider: userConfig?.endpointProvider ?? Zw4.defaultEndpointResolver,
    // Use provided extensions or default to empty array
    extensions: userConfig?.extensions ?? [],
    // Use provided HTTP auth scheme provider or default
    httpAuthSchemeProvider: userConfig?.httpAuthSchemeProvider ?? Gw4.defaultSTSHttpAuthSchemeProvider,
    // Use provided HTTP auth schemes or default to SigV4 and NoAuth
    httpAuthSchemes: userConfig?.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // Identity provider for SigV4
        identityProvider: (clientConfig) => clientConfig.getIdentityProvider("aws.auth#sigv4"),
        // AWS SigV4 signer instance
        signer: new Aw4.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        // Identity provider for NoAuth; returns empty object if not found
        identityProvider: (clientConfig) => clientConfig.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        // NoAuth signer instance
        signer: new Bw4.NoAuthSigner()
      }
    ],
    // Use provided logger or default to NoOpLogger
    logger: userConfig?.logger ?? new Qw4.NoOpLogger(),
    // Use provided service updateSnapshotAndNotify or default to 'STS'
    serviceId: userConfig?.serviceId ?? "STS",
    // Use provided URL parser or default
    urlParser: userConfig?.urlParser ?? Iw4.parseUrl,
    // Use provided UTF-8 decoder or default
    utf8Decoder: userConfig?.utf8Decoder ?? f00.fromUtf8,
    // Use provided UTF-8 encoder or default
    utf8Encoder: userConfig?.utf8Encoder ?? f00.toUtf8
  };
}

module.exports = createStsClientConfig;
