/**
 * Merges OTLP gRPC configuration objects from multiple sources, resolving URL, credentials, and metadata.
 *
 * @param {Object} sourceConfig - Primary configuration object, may contain url, metadata, and credentials.
 * @param {Object} fallbackConfig - Secondary configuration object, used if primary is missing properties.
 * @param {Object} defaultConfig - Default configuration object, used as a last resort for missing properties.
 * @returns {Object} Combined configuration object with merged properties and resolved metadata/credentials.
 */
function mergeOtlpGrpcConfiguration(sourceConfig, fallbackConfig, defaultConfig) {
  // Resolve the URL from the first available source
  const resolvedUrl = sourceConfig.url ?? fallbackConfig.url ?? defaultConfig.url;

  return {
    // Merge shared configuration properties using external utility
    ...Hx0.mergeOtlpSharedConfigurationWithDefaults(sourceConfig, fallbackConfig, defaultConfig),

    // Provide a metadata function that merges metadata from all sources
    metadata: () => {
      // Start with the defaultConfig'createInteractionAccessor metadata
      const mergedMetadata = defaultConfig.metadata();
      // Merge in sourceConfig'createInteractionAccessor metadata if available, otherwise use empty metadata
      Kx0(
        mergedMetadata,
        sourceConfig.metadata?.().clone() ?? cs.createEmptyMetadata()
      );
      // Merge in fallbackConfig'createInteractionAccessor metadata if available, otherwise use empty metadata
      Kx0(
        mergedMetadata,
        fallbackConfig.metadata?.() ?? cs.createEmptyMetadata()
      );
      return mergedMetadata;
    },

    // Normalize the URL using external utility
    url: extractGrpcHostFromUrl(resolvedUrl),

    // Resolve credentials from the first available source
    credentials:
      sourceConfig.credentials ??
      fallbackConfig.credentials?.(resolvedUrl) ??
      defaultConfig.credentials(resolvedUrl)
  };
}

module.exports = mergeOtlpGrpcConfiguration;