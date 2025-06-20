/**
 * Builds a configuration object for the Cognito Identity client, providing default implementations
 * for various encoding, logging, endpoint, and authentication scheme options if not supplied.
 *
 * @param {Object} [customConfig={}] - Optional custom configuration overrides.
 * @param {Function} [customConfig.base64Decoder] - Function to decode base64 strings.
 * @param {Function} [customConfig.base64Encoder] - Function to encode strings to base64.
 * @param {boolean} [customConfig.disableHostPrefix] - Whether to disable host prefixing.
 * @param {Function} [customConfig.endpointProvider] - Function to resolve endpoints.
 * @param {Array} [customConfig.extensions] - Array of extension objects.
 * @param {Function} [customConfig.httpAuthSchemeProvider] - Provider for HTTP authentication schemes.
 * @param {Array} [customConfig.httpAuthSchemes] - Array of HTTP authentication scheme definitions.
 * @param {Object} [customConfig.logger] - Logger instance.
 * @param {string} [customConfig.serviceId] - Service identifier string.
 * @param {Function} [customConfig.urlParser] - Function to parse URLs.
 * @param {Function} [customConfig.utf8Decoder] - Function to decode UTF-8 strings.
 * @param {Function} [customConfig.utf8Encoder] - Function to encode strings to UTF-8.
 * @returns {Object} Fully populated Cognito Identity client configuration object.
 */
function buildCognitoIdentityClientConfig(customConfig = {}) {
  return {
    apiVersion: "2014-06-30",
    // Use provided base64 decoder or default implementation
    base64Decoder: customConfig.base64Decoder ?? L02.fromBase64,
    // Use provided base64 encoder or default implementation
    base64Encoder: customConfig.base64Encoder ?? L02.toBase64,
    // Use provided flag to disable host prefix or default to false
    disableHostPrefix: customConfig.disableHostPrefix ?? false,
    // Use provided endpoint provider or default resolver
    endpointProvider: customConfig.endpointProvider ?? By6.defaultEndpointResolver,
    // Use provided extensions or default to empty array
    extensions: customConfig.extensions ?? [],
    // Use provided HTTP auth scheme provider or default Cognito provider
    httpAuthSchemeProvider: customConfig.httpAuthSchemeProvider ?? Ay6.defaultCognitoIdentityHttpAuthSchemeProvider,
    // Use provided HTTP auth schemes or default to SigV4 and NoAuth
    httpAuthSchemes: customConfig.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // Identity provider for SigV4
        identityProvider: (authSchemeContext) => authSchemeContext.getIdentityProvider("aws.auth#sigv4"),
        signer: new rk6.AwsSdkSigV4Signer()
      },
      {
        schemeId: "smithy.api#noAuth",
        // Identity provider for NoAuth; fallback to empty async function if not found
        identityProvider: (authSchemeContext) =>
          authSchemeContext.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
        signer: new ok6.NoAuthSigner()
      }
    ],
    // Use provided logger or default NoOpLogger
    logger: customConfig.logger ?? new tk6.NoOpLogger(),
    // Use provided service updateSnapshotAndNotify or default to 'Cognito Identity'
    serviceId: customConfig.serviceId ?? "Cognito Identity",
    // Use provided URL parser or default implementation
    urlParser: customConfig.urlParser ?? ek6.parseUrl,
    // Use provided UTF-8 decoder or default implementation
    utf8Decoder: customConfig.utf8Decoder ?? R02.fromUtf8,
    // Use provided UTF-8 encoder or default implementation
    utf8Encoder: customConfig.utf8Encoder ?? R02.toUtf8
  };
}

module.exports = buildCognitoIdentityClientConfig;
