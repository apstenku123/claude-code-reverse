/**
 * Merges OTLP (OpenTelemetry Protocol) configuration objects from multiple sources, prioritizing values from the source configuration,
 * then the fallback configuration, and finally the default configuration. Also merges and normalizes headers and agent options.
 *
 * @param {Object} sourceConfig - Primary configuration object (highest priority).
 * @param {Object} fallbackConfig - Secondary configuration object (medium priority).
 * @param {Object} defaultConfig - Default configuration object (lowest priority).
 * @returns {Object} The merged OTLP configuration object with normalized headers, url, and agent options.
 */
function mergeOtlpConfiguration(sourceConfig, fallbackConfig, defaultConfig) {
  // Merge shared OTLP configuration with defaults using external utility
  const mergedConfig = TO0.mergeOtlpSharedConfigurationWithDefaults(
    sourceConfig,
    fallbackConfig,
    defaultConfig
  );

  // Normalize and merge headers from all sources
  const normalizedSourceHeaders = G26.validateAndNormalizeHeaders(sourceConfig.headers);
  const mergedHeaders = createMergedStateProvider(
    normalizedSourceHeaders,
    fallbackConfig.headers,
    defaultConfig.headers
  );

  // Determine the URL, prioritizing sourceConfig, then fallbackConfig, then defaultConfig
  const mergedUrl = validateExportUrl(sourceConfig.url) ?? fallbackConfig.url ?? defaultConfig.url;

  // Determine agent options, prioritizing sourceConfig, then fallbackConfig, then defaultConfig
  const mergedAgentOptions =
    sourceConfig.agentOptions ?? fallbackConfig.agentOptions ?? defaultConfig.agentOptions;

  // Return the fully merged configuration object
  return {
    ...mergedConfig,
    headers: mergedHeaders,
    url: mergedUrl,
    agentOptions: mergedAgentOptions
  };
}

module.exports = mergeOtlpConfiguration;
