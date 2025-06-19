/**
 * Merges OTLP HTTP configuration from various sources, applying defaults and environment overrides.
 *
 * @param {Object} userConfig - The user-provided configuration object for OTLP HTTP.
 * @param {Object} environment - The environment variables or configuration source.
 * @param {Object} context - Additional context or subscription information.
 * @param {Object} defaultsIdentifier - Identifier or options for retrieving default configuration.
 * @returns {Object} The merged OTLP HTTP configuration object.
 */
function mergeHttpOtlpConfiguration(userConfig, environment, context, defaultsIdentifier) {
  // Warn if metadata is set, as isBlobOrFileLikeObject'createInteractionAccessor not supported with HTTP
  if (userConfig.metadata) {
    U26.diag.warn("Metadata cannot be set when using http");
  }

  // Merge user config, environment config, and defaults
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
    xO0.getHttpConfigurationDefaults(defaultsIdentifier, context)
  );
}

module.exports = mergeHttpOtlpConfiguration;