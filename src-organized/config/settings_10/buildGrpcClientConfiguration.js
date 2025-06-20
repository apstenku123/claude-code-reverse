/**
 * Builds a comprehensive gRPC client configuration object based on the provided environment source.
 *
 * This function gathers shared configuration from the environment, extracts metadata and URL,
 * and provides a credentials factory function that determines the appropriate credentials
 * based on the URL protocol (http/https/other).
 *
 * @param {object} environmentSource - The environment or configuration source for the gRPC client.
 * @returns {object} An object containing the merged configuration, metadata, url, and a credentials factory.
 */
function buildGrpcClientConfiguration(environmentSource) {
  return {
    // Merge shared configuration from the environment
    ...iG6.getSharedConfigurationFromEnvironment(environmentSource),

    // Extract metadata for the gRPC client
    metadata: createDeferredValueProvider(environmentSource),

    // Extract the target URL for the gRPC client
    url: getOtelExporterOtlpEndpoint(environmentSource),

    /**
     * Factory function to provide credentials based on the URL protocol.
     * @param {string} url - The target URL for the gRPC connection.
     * @returns {function} a function that returns the appropriate credentials when invoked.
     */
    credentials: (url) => {
      // Use insecure credentials for HTTP connections
      if (url.startsWith("http://")) {
        return () => {
          return ls.createInsecureCredentials();
        };
      }
      // Use secure credentials for HTTPS connections
      else if (url.startsWith("https://")) {
        return () => {
          return createSslCredentialsFromCerts(environmentSource);
        };
      }
      // Fallback for other protocols
      return () => {
        return BZ6(environmentSource);
      };
    }
  };
}

module.exports = buildGrpcClientConfiguration;