/**
 * Merges gRPC client configuration objects, resolving URL, credentials, and metadata.
 *
 * This function combines configuration from three sources (primary, secondary, and default),
 * resolving the URL, credentials, and metadata in a prioritized order. It also merges shared
 * OTLP configuration defaults and ensures metadata is properly cloned and combined.
 *
 * @param {Object} primaryConfig - The primary configuration object (highest priority).
 * @param {Object} secondaryConfig - The secondary configuration object (medium priority).
 * @param {Object} defaultConfig - The default configuration object (lowest priority, provides defaults).
 * @returns {Object} The merged gRPC client configuration object.
 */
function mergeGrpcClientConfiguration(primaryConfig, secondaryConfig, defaultConfig) {
  // Resolve the URL in order of priority: primary, secondary, then default
  const resolvedUrl = primaryConfig.url ?? secondaryConfig.url ?? defaultConfig.url;

  return {
    // Merge shared OTLP configuration with defaults
    ...Hx0.mergeOtlpSharedConfigurationWithDefaults(primaryConfig, secondaryConfig, defaultConfig),

    /**
     * Returns merged metadata for the gRPC client.
     * Combines metadata from defaultConfig, primaryConfig, and secondaryConfig in order.
     * Clones metadata from primaryConfig to avoid mutation.
     * @returns {Object} The merged metadata object.
     */
    metadata: () => {
      // Start with metadata from defaultConfig
      const mergedMetadata = defaultConfig.metadata();
      // Merge in cloned metadata from primaryConfig, or empty if not present
      Kx0(
        mergedMetadata,
        primaryConfig.metadata?.().clone() ?? cs.createEmptyMetadata()
      );
      // Merge in metadata from secondaryConfig, or empty if not present
      Kx0(
        mergedMetadata,
        secondaryConfig.metadata?.() ?? cs.createEmptyMetadata()
      );
      return mergedMetadata;
    },

    // Normalize the resolved URL using extractGrpcHostFromUrl
    url: extractGrpcHostFromUrl(resolvedUrl),

    // Resolve credentials in order of priority: primary, secondary (as a function), then default (as a function)
    credentials:
      primaryConfig.credentials ??
      secondaryConfig.credentials?.(resolvedUrl) ??
      defaultConfig.credentials(resolvedUrl)
  };
}

module.exports = mergeGrpcClientConfiguration;