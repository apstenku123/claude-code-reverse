/**
 * Creates a gRPC client configuration object based on the provided environment source.
 *
 * This function gathers shared configuration from the environment, extracts metadata and URL,
 * and provides a credentials factory based on the protocol of the target URL.
 *
 * @param {object} environmentSource - The source object containing environment configuration.
 * @returns {object} The complete gRPC client configuration object.
 */
function createGrpcClientConfiguration(environmentSource) {
  return {
    // Merge shared configuration from the environment
    ...iG6.getSharedConfigurationFromEnvironment(environmentSource),

    // Extract metadata for the client
    metadata: createDeferredValueProvider(environmentSource),

    // Extract the service URL
    url: getOtelExporterOtlpEndpoint(environmentSource),

    /**
     * Returns a credentials factory function based on the protocol of the given URL.
     *
     * @param {string} targetUrl - The URL to determine which credentials to use.
     * @returns {function} a function that returns the appropriate credentials object.
     */
    credentials: (targetUrl) => {
      // If the URL starts with 'http://', use insecure credentials
      if (targetUrl.startsWith("http://")) {
        return () => {
          return ls.createInsecureCredentials();
        };
      }
      // If the URL starts with 'https://', use secure credentials
      else if (targetUrl.startsWith("https://")) {
        return () => {
          return createSslCredentialsFromCerts(environmentSource);
        };
      }
      // For any other protocol, use a custom credentials provider
      return () => {
        return BZ6(environmentSource);
      };
    }
  };
}

module.exports = createGrpcClientConfiguration;