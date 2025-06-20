/**
 * Builds a merged OTLP gRPC client configuration object from multiple sources.
 *
 * This function merges configuration options from a primary source, a secondary config,
 * and a fallback subscription. It determines the effective URL, merges metadata,
 * and resolves credentials in a prioritized order.
 *
 * @param {Object} sourceObservable - Primary configuration source, may provide url, metadata, and credentials.
 * @param {Object} config - Secondary configuration, may provide url, metadata, and credentials (as a function).
 * @param {Object} subscription - Fallback configuration, must provide url, metadata (function), and credentials (function).
 * @returns {Object} Merged OTLP gRPC client configuration object with url, metadata, and credentials.
 */
function buildOtlpGrpcClientConfig(sourceObservable, config, subscription) {
  // Determine the effective URL: prefer sourceObservable, then config, then subscription
  const effectiveUrl = sourceObservable.url ?? config.url ?? subscription.url;

  return {
    // Merge shared configuration options from all sources
    ...Hx0.mergeOtlpSharedConfigurationWithDefaults(sourceObservable, config, subscription),

    /**
     * Returns merged metadata for the gRPC client.
     * Merges metadata from sourceObservable and config into the subscription'createInteractionAccessor metadata.
     * @returns {Object} Metadata object
     */
    metadata: () => {
      // Start with the subscription'createInteractionAccessor metadata
      const mergedMetadata = subscription.metadata();
      // Merge in sourceObservable'createInteractionAccessor metadata if available, else use empty metadata
      Kx0(
        mergedMetadata,
        sourceObservable.metadata?.().clone() ?? cs.createEmptyMetadata()
      );
      // Merge in config'createInteractionAccessor metadata if available, else use empty metadata
      Kx0(
        mergedMetadata,
        config.metadata?.() ?? cs.createEmptyMetadata()
      );
      return mergedMetadata;
    },

    // Normalize the URL using extractGrpcHostFromUrl
    url: extractGrpcHostFromUrl(effectiveUrl),

    // Resolve credentials: prefer sourceObservable, then config (as a function), then subscription (as a function)
    credentials:
      sourceObservable.credentials ??
      config.credentials?.(effectiveUrl) ??
      subscription.credentials(effectiveUrl)
  };
}

module.exports = buildOtlpGrpcClientConfig;