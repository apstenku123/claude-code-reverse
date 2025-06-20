/**
 * Merges HTTP exporter configuration from multiple sources (user input, environment, and defaults).
 * Warns if metadata is set when using HTTP, as this is not supported.
 *
 * @param {Object} userConfig - User-supplied HTTP exporter configuration options.
 * @param {Object} environment - Environment variables or configuration relevant to HTTP exporter.
 * @param {Object} context - Additional context or subscription information for configuration.
 * @param {Object} defaultsInput - Input for determining default HTTP exporter configuration.
 * @returns {Object} - The merged HTTP exporter configuration object.
 */
function mergeHttpExporterConfiguration(userConfig, environment, context, defaultsInput) {
  // Warn if metadata is set, as HTTP exporter does not support metadata
  if (userConfig.metadata) {
    U26.diag.warn("Metadata cannot be set when using http");
  }

  // Merge configuration from user input, environment, and defaults
  return xO0.mergeOtlpHttpConfigurationWithDefaults(
    {
      url: userConfig.url,
      headers: N26.wrapStaticHeadersInFunction(userConfig.headers),
      concurrencyLimit: userConfig.concurrencyLimit,
      timeoutMillis: userConfig.timeoutMillis,
      compression: userConfig.compression,
      agentOptions: ensureHttpAgentKeepAliveOption(userConfig)
    },
    E26.getHttpConfigurationFromEnvironment(environment, context),
    xO0.getHttpConfigurationDefaults(defaultsInput, context)
  );
}

module.exports = mergeHttpExporterConfiguration;