/**
 * Returns the default configuration object for the OTLP Exporter in JavaScript.
 * This includes shared configuration defaults, a metadata generator, the default OTLP endpoint URL,
 * and a credentials factory based on the provided URL protocol.
 *
 * @returns {Object} The OTLP Exporter configuration object.
 */
function getOtlpExporterConfiguration() {
  return {
    // Spread shared configuration defaults from Hx0
    ...Hx0.getSharedConfigurationDefaults(),

    /**
     * Generates metadata for the exporter, including a User-Agent header.
     *
     * @returns {Object} Metadata object with User-Agent set.
     */
    metadata: () => {
      // Create an empty metadata object
      const metadata = cs.createEmptyMetadata();
      // Set the User-Agent header with the exporter version
      metadata.set(
        "User-Agent",
        `OTel-OTLP-Exporter-JavaScript/${mG6.VERSION}`
      );
      return metadata;
    },

    /**
     * The default OTLP endpoint URL for the exporter.
     */
    url: "http://localhost:4317",

    /**
     * Returns a credentials factory function based on the URL protocol.
     * If the URL starts with 'http://', returns a function that creates insecure credentials.
     * Otherwise, returns a function that creates SSL credentials.
     *
     * @param {string} exporterUrl - The exporter endpoint URL.
     * @returns {Function} a function that creates the appropriate credentials.
     */
    credentials: (exporterUrl) => {
      if (exporterUrl.startsWith("http://")) {
        // For HTTP, use insecure credentials
        return () => cs.createInsecureCredentials();
      } else {
        // For HTTPS, use SSL credentials
        return () => cs.createSslCredentials();
      }
    }
  };
}

module.exports = getOtlpExporterConfiguration;