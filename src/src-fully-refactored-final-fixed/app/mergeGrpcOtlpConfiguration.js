/**
 * Merges OTLP gRPC configuration options from provided parameters, environment variables, and defaults.
 *
 * This function prepares a configuration object for OTLP gRPC exporters by combining user-supplied options,
 * environment-derived settings, and library defaults. It also enforces that custom headers are not set when using gRPC.
 *
 * @param {Object} userOptions - The user-supplied OTLP gRPC configuration options.
 * @param {string} [userOptions.url] - The endpoint URL for the gRPC exporter.
 * @param {Object} [userOptions.headers] - Custom headers (not allowed for gRPC; will trigger a warning if present).
 * @param {Object} [userOptions.metadata] - Optional gRPC metadata to send with requests.
 * @param {string} [userOptions.compression] - Compression algorithm to use.
 * @param {number} [userOptions.timeoutMillis] - Request timeout in milliseconds.
 * @param {number} [userOptions.concurrencyLimit] - Maximum number of concurrent requests.
 * @param {Object} [userOptions.credentials] - gRPC credentials object.
 * @param {Object} envContext - The environment context used to extract configuration from environment variables.
 * @returns {Object} The merged OTLP gRPC configuration object.
 */
function mergeGrpcOtlpConfiguration(userOptions, envContext) {
  // Warn if headers are set, as gRPC does not support custom headers in this context
  if (userOptions.headers) {
    IZ6.diag.warn("Headers cannot be set when using grpc");
  }

  const grpcCredentials = userOptions.credentials;

  // Prepare the configuration object, using defaults for missing metadata
  const mergedConfig = Tx0.mergeOtlpGrpcConfigurationWithDefaults({
    url: userOptions.url,
    metadata: () => {
      // Use provided metadata or create an empty metadata object
      return userOptions.metadata ?? GZ6.createEmptyMetadata();
    },
    compression: userOptions.compression,
    timeoutMillis: userOptions.timeoutMillis,
    concurrencyLimit: userOptions.concurrencyLimit,
    // Only provide credentials if they are defined
    credentials: grpcCredentials != null ? () => grpcCredentials : undefined
  },
  // Merge with environment-derived and default configurations
  ZZ6.getOtlpGrpcConfigurationFromEnv(envContext),
  Tx0.getOtlpGrpcDefaultConfiguration()
  );

  return mergedConfig;
}

module.exports = mergeGrpcOtlpConfiguration;