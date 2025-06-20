/**
 * Merges OTLP gRPC configuration from multiple sources, resolving URL, credentials, and metadata.
 *
 * @param {Object} sourceConfig - Primary configuration source, may provide url, credentials, and metadata.
 * @param {Object} fallbackConfig - Secondary configuration source, used if primary is missing values.
 * @param {Object} defaultConfig - Default configuration, used as last resort for missing values.
 * @returns {Object} Complete OTLP gRPC configuration with merged metadata, url, and credentials.
 */
function createOtlpGrpcConfiguration(sourceConfig, fallbackConfig, defaultConfig) {
  // Resolve the OTLP endpoint URL, preferring sourceConfig, then fallbackConfig, then defaultConfig
  const resolvedUrl = sourceConfig.url ?? fallbackConfig.url ?? defaultConfig.url;

  return {
    // Merge shared configuration options from all sources
    ...Hx0.mergeOtlpSharedConfigurationWithDefaults(sourceConfig, fallbackConfig, defaultConfig),

    /**
     * Returns merged metadata for the gRPC connection.
     * Combines metadata from defaultConfig, sourceConfig, and fallbackConfig.
     * @returns {Object} Metadata object
     */
    metadata: () => {
      // Start with metadata from defaultConfig
      const mergedMetadata = defaultConfig.metadata();
      // Merge in sourceConfig metadata if available, otherwise use empty metadata
      Kx0(
        mergedMetadata,
        sourceConfig.metadata?.().clone() ?? cs.createEmptyMetadata()
      );
      // Merge in fallbackConfig metadata if available, otherwise use empty metadata
      Kx0(
        mergedMetadata,
        fallbackConfig.metadata?.() ?? cs.createEmptyMetadata()
      );
      return mergedMetadata;
    },

    // Normalize and return the resolved URL
    url: extractGrpcHostFromUrl(resolvedUrl),

    // Resolve credentials, preferring sourceConfig, then fallbackConfig, then defaultConfig
    credentials:
      sourceConfig.credentials ??
      fallbackConfig.credentials?.(resolvedUrl) ??
      defaultConfig.credentials(resolvedUrl)
  };
}

module.exports = createOtlpGrpcConfiguration;