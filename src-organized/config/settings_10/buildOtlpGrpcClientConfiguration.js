/**
 * Builds the configuration object for an OTLP gRPC client by merging shared configuration defaults and handling metadata and credentials resolution.
 *
 * @param {Object} sourceObservable - The primary source of configuration, may provide url, metadata, and credentials.
 * @param {Object} config - Secondary configuration, may provide url, metadata, and credentials (as a function).
 * @param {Object} subscription - Fallback/default configuration, must provide url, metadata, and credentials (as functions).
 * @returns {Object} The merged configuration object for the OTLP gRPC client.
 */
function buildOtlpGrpcClientConfiguration(sourceObservable, config, subscription) {
  // Determine the effective URL, preferring sourceObservable, then config, then subscription
  const resolvedUrl = sourceObservable.url ?? config.url ?? subscription.url;

  return {
    // Merge shared configuration defaults from all sources
    ...Hx0.mergeOtlpSharedConfigurationWithDefaults(sourceObservable, config, subscription),

    /**
     * Returns merged metadata for the gRPC client.
     * Combines metadata from subscription, sourceObservable, and config.
     * @returns {Object} The merged metadata object.
     */
    metadata: () => {
      // Start with metadata from subscription
      const baseMetadata = subscription.metadata();
      // Merge in cloned metadata from sourceObservable, or an empty metadata object if not present
      Kx0(baseMetadata, sourceObservable.metadata?.().clone() ?? cs.createEmptyMetadata());
      // Merge in metadata from config, or an empty metadata object if not present
      Kx0(baseMetadata, config.metadata?.() ?? cs.createEmptyMetadata());
      return baseMetadata;
    },

    // Normalize the resolved URL using extractGrpcHostFromUrl
    url: extractGrpcHostFromUrl(resolvedUrl),

    // Resolve credentials: prefer sourceObservable, then config (as a function), then subscription (as a function)
    credentials: sourceObservable.credentials
      ?? config.credentials?.(resolvedUrl)
      ?? subscription.credentials(resolvedUrl)
  };
}

module.exports = buildOtlpGrpcClientConfiguration;