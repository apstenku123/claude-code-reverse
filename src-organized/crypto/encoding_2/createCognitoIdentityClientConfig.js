/**
 * Creates a configuration object for the Cognito Identity client.
 *
 * This function merges user-provided configuration options with sensible defaults
 * for the AWS Cognito Identity client. It ensures that all required fields are present,
 * providing default implementations for encoding, decoding, logging, endpoint resolution,
 * authentication schemes, and URL parsing if not supplied by the user.
 *
 * @param {Object} [userConfig={}] - Optional configuration overrides for the Cognito Identity client.
 * @param {Function} [userConfig.base64Decoder] - Custom function to decode base64 strings.
 * @param {Function} [userConfig.base64Encoder] - Custom function to encode base64 strings.
 * @param {boolean} [userConfig.disableHostPrefix] - Whether to disable the host prefix.
 * @param {Function} [userConfig.endpointProvider] - Custom endpoint provider function.
 * @param {Array} [userConfig.extensions] - Array of client extensions.
 * @param {Function} [userConfig.httpAuthSchemeProvider] - Custom HTTP auth scheme provider.
 * @param {Array} [userConfig.httpAuthSchemes] - Array of HTTP authentication schemes.
 * @param {Object} [userConfig.logger] - Custom logger instance.
 * @param {string} [userConfig.serviceId] - Service identifier string.
 * @param {Function} [userConfig.urlParser] - Custom URL parser function.
 * @param {Function} [userConfig.utf8Decoder] - Custom function to decode UTF-8 strings.
 * @param {Function} [userConfig.utf8Encoder] - Custom function to encode UTF-8 strings.
 * @returns {Object} The complete Cognito Identity client configuration object.
 */
function createCognitoIdentityClientConfig(userConfig = {}) {
  return {
    apiVersion: "2014-06-30",
    // Use provided base64 decoder or default implementation
    base64Decoder: userConfig.base64Decoder ?? L02.fromBase64,
    // Use provided base64 encoder or default implementation
    base64Encoder: userConfig.base64Encoder ?? L02.toBase64,
    // Use provided flag to disable host prefix or default to false
    disableHostPrefix: userConfig.disableHostPrefix ?? false,
    // Use provided endpoint provider or default endpoint resolver
    endpointProvider: userConfig.endpointProvider ?? By6.defaultEndpointResolver,
    // Use provided extensions array or default to empty array
    extensions: userConfig.extensions ?? [],
    // Use provided HTTP auth scheme provider or default Cognito provider
    httpAuthSchemeProvider: userConfig.httpAuthSchemeProvider ?? Ay6.defaultCognitoIdentityHttpAuthSchemeProvider,
    // Use provided HTTP auth schemes or default to SigV4 and NoAuth
    httpAuthSchemes: userConfig.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // Identity provider for SigV4 authentication
        identityProvider: (clientContext) => clientContext.getIdentityProvider("aws.auth#sigv4"),
        signer: new rk6.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        // Identity provider for NoAuth; fallback to empty async function if not present
        identityProvider: (clientContext) => clientContext.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new ok6.NoAuthSigner()
      }
    ],
    // Use provided logger or default no-op logger
    logger: userConfig.logger ?? new tk6.NoOpLogger(),
    // Use provided service updateSnapshotAndNotify or default to 'Cognito Identity'
    serviceId: userConfig.serviceId ?? "Cognito Identity",
    // Use provided URL parser or default implementation
    urlParser: userConfig.urlParser ?? ek6.parseUrl,
    // Use provided UTF-8 decoder or default implementation
    utf8Decoder: userConfig.utf8Decoder ?? R02.fromUtf8,
    // Use provided UTF-8 encoder or default implementation
    utf8Encoder: userConfig.utf8Encoder ?? R02.toUtf8
  };
}

module.exports = createCognitoIdentityClientConfig;
