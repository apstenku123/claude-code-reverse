/**
 * Builds the OTLP gRPC configuration by merging user-provided options, environment variables, and defaults.
 *
 * @param {Object} userOptions - The user-provided OTLP gRPC configuration options.
 * @param {string} [userOptions.url] - The OTLP gRPC endpoint URL.
 * @param {Object} [userOptions.headers] - Headers to include in the request (not allowed for gRPC).
 * @param {Object} [userOptions.metadata] - gRPC metadata to send with the request.
 * @param {string} [userOptions.compression] - Compression algorithm to use.
 * @param {number} [userOptions.timeoutMillis] - Request timeout in milliseconds.
 * @param {number} [userOptions.concurrencyLimit] - Maximum number of concurrent requests.
 * @param {any} [userOptions.credentials] - gRPC credentials to use for the connection.
 * @param {Object} env - The environment object to read configuration from.
 * @returns {Object} The merged OTLP gRPC configuration object.
 */
function buildOtlpGrpcConfiguration(userOptions, env) {
  // Warn if headers are set, as gRPC does not allow setting headers directly
  if (userOptions.headers) {
    IZ6.diag.warn("Headers cannot be set when using grpc");
  }

  const grpcCredentials = userOptions.credentials;

  // Merge user options, environment config, and defaults
  return Tx0.mergeOtlpGrpcConfigurationWithDefaults(
    {
      url: userOptions.url,
      // Provide metadata, defaulting to an empty metadata object if not set
      metadata: () => {
        return userOptions.metadata ?? GZ6.createEmptyMetadata();
      },
      compression: userOptions.compression,
      timeoutMillis: userOptions.timeoutMillis,
      concurrencyLimit: userOptions.concurrencyLimit,
      // Only provide credentials if they are defined
      credentials: grpcCredentials != null ? () => grpcCredentials : undefined
    },
    ZZ6.getOtlpGrpcConfigurationFromEnv(env),
    Tx0.getOtlpGrpcDefaultConfiguration()
  );
}

module.exports = buildOtlpGrpcConfiguration;