/**
 * Creates a configuration object for the Bedrock Runtime client.
 *
 * This function takes an optional configuration object and fills in any missing properties
 * with sensible defaults. It is used to standardize and centralize the configuration
 * required for interacting with the Bedrock Runtime service, including encoding/decoding,
 * endpoint resolution, authentication, logging, and more.
 *
 * @param {Object} [customConfig={}] - Partial configuration to override default settings.
 * @param {Function} [customConfig.base64Decoder] - Function to decode base64 strings.
 * @param {Function} [customConfig.base64Encoder] - Function to encode strings to base64.
 * @param {boolean} [customConfig.disableHostPrefix] - Whether to disable host prefixing.
 * @param {Function} [customConfig.endpointProvider] - Function to resolve endpoints.
 * @param {Array} [customConfig.extensions] - Array of extension objects.
 * @param {Function} [customConfig.httpAuthSchemeProvider] - Provider for HTTP auth schemes.
 * @param {Array} [customConfig.httpAuthSchemes] - Array of HTTP auth scheme definitions.
 * @param {Object} [customConfig.logger] - Logger instance.
 * @param {string} [customConfig.serviceId] - Service identifier string.
 * @param {Function} [customConfig.urlParser] - Function to parse URLs.
 * @param {Function} [customConfig.utf8Decoder] - Function to decode UTF-8 strings.
 * @param {Function} [customConfig.utf8Encoder] - Function to encode strings to UTF-8.
 * @returns {Object} Complete configuration object for Bedrock Runtime client.
 */
function createBedrockRuntimeConfig(customConfig = {}) {
  return {
    apiVersion: "2023-09-30",
    // Use provided base64 decoder or default implementation
    base64Decoder: customConfig.base64Decoder ?? t72.fromBase64,
    // Use provided base64 encoder or default implementation
    base64Encoder: customConfig.base64Encoder ?? t72.toBase64,
    // Whether to disable host prefixing (default: false)
    disableHostPrefix: customConfig.disableHostPrefix ?? false,
    // Endpoint provider for resolving service endpoints
    endpointProvider: customConfig.endpointProvider ?? rl6.defaultEndpointResolver,
    // Extensions array, defaults to empty
    extensions: customConfig.extensions ?? [],
    // HTTP authentication scheme provider
    httpAuthSchemeProvider: customConfig.httpAuthSchemeProvider ?? sl6.defaultBedrockRuntimeHttpAuthSchemeProvider,
    // HTTP authentication schemes array
    httpAuthSchemes: customConfig.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // Identity provider for the SigV4 scheme
        identityProvider: (authConfig) => authConfig.getIdentityProvider("aws.auth#sigv4"),
        // Signer instance for SigV4
        signer: new il6.AwsSdkSigV4Signer()
      }
    ],
    // Logger instance (defaults to no-op logger)
    logger: customConfig.logger ?? new nl6.NoOpLogger(),
    // Service identifier
    serviceId: customConfig.serviceId ?? "Bedrock Runtime",
    // URL parser function
    urlParser: customConfig.urlParser ?? al6.parseUrl,
    // UTF-8 decoder function
    utf8Decoder: customConfig.utf8Decoder ?? e72.fromUtf8,
    // UTF-8 encoder function
    utf8Encoder: customConfig.utf8Encoder ?? e72.toUtf8
  };
}

module.exports = createBedrockRuntimeConfig;
