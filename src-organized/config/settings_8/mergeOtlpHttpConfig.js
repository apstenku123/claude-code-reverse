/**
 * Merges OTLP HTTP configuration from user input, environment variables, and defaults.
 * Warns if metadata is set when using HTTP, as this is not supported.
 *
 * @param {Object} userConfig - User-provided OTLP HTTP configuration options.
 * @param {Object} environment - Environment variables for configuration overrides.
 * @param {Object} subscriptionContext - Context object for subscription (used for defaults).
 * @param {Object} logger - Logger instance for diagnostic output.
 * @returns {Object} - The merged OTLP HTTP configuration object.
 */
function mergeOtlpHttpConfig(userConfig, environment, subscriptionContext, logger) {
  // Warn if metadata is set, as HTTP transport does not support metadata
  if (userConfig.metadata) {
    logger.diag.warn("Metadata cannot be set when using http");
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
    E26.getHttpConfigurationFromEnvironment(environment, subscriptionContext),
    xO0.getHttpConfigurationDefaults(logger, subscriptionContext)
  );
}

module.exports = mergeOtlpHttpConfig;