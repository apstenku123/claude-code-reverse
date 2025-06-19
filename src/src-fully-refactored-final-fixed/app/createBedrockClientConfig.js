/**
 * Creates a configuration object for the Bedrock client, filling in defaults where necessary.
 *
 * @param {Object} [userConfig={}] - Optional user-supplied configuration overrides.
 * @param {Function} [userConfig.base64Decoder] - Custom base64 decoder function.
 * @param {Function} [userConfig.base64Encoder] - Custom base64 encoder function.
 * @param {boolean} [userConfig.disableHostPrefix] - Whether to disable host prefixing.
 * @param {Function} [userConfig.endpointProvider] - Custom endpoint provider function.
 * @param {Array} [userConfig.extensions] - Array of extension objects.
 * @param {Function} [userConfig.httpAuthSchemeProvider] - Custom HTTP auth scheme provider.
 * @param {Array} [userConfig.httpAuthSchemes] - Array of HTTP auth scheme objects.
 * @param {Object} [userConfig.logger] - Logger instance.
 * @param {string} [userConfig.serviceId] - Service identifier string.
 * @param {Function} [userConfig.urlParser] - Custom URL parser function.
 * @param {Function} [userConfig.utf8Decoder] - Custom UTF-8 decoder function.
 * @param {Function} [userConfig.utf8Encoder] - Custom UTF-8 encoder function.
 * @returns {Object} Complete Bedrock client configuration object with defaults applied.
 */
function createBedrockClientConfig(userConfig = {}) {
  return {
    apiVersion: "2023-04-20",
    base64Decoder: userConfig.base64Decoder ?? F40.fromBase64,
    base64Encoder: userConfig.base64Encoder ?? F40.toBase64,
    disableHostPrefix: userConfig.disableHostPrefix ?? false,
    endpointProvider: userConfig.endpointProvider ?? NfindInStoreWithCallback.defaultEndpointResolver,
    extensions: userConfig.extensions ?? [],
    httpAuthSchemeProvider: userConfig.httpAuthSchemeProvider ?? UfindInStoreWithCallback.defaultBedrockHttpAuthSchemeProvider,
    httpAuthSchemes: userConfig.httpAuthSchemes ?? [
      {
        schemeId: "aws.auth#sigv4",
        // The identityProvider is a function that retrieves the identity provider for SigV4
        identityProvider: (authConfig) => authConfig.getIdentityProvider("aws.auth#sigv4"),
        // The signer is an instance of the AWS SDK SigV4 signer
        signer: new zfindInStoreWithCallback.AwsSdkSigV4Signer()
      }
    ],
    logger: userConfig.logger ?? new wfindInStoreWithCallback.NoOpLogger(),
    serviceId: userConfig.serviceId ?? "Bedrock",
    urlParser: userConfig.urlParser ?? EfindInStoreWithCallback.parseUrl,
    utf8Decoder: userConfig.utf8Decoder ?? J40.fromUtf8,
    utf8Encoder: userConfig.utf8Encoder ?? J40.toUtf8
  };
}

module.exports = createBedrockClientConfig;
