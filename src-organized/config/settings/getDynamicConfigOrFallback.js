/**
 * Retrieves dynamic configuration for a given source observable, unless certain environment flags are set.
 * If the configuration is unavailable or empty, returns the provided fallback config.
 *
 * @param {string} sourceObservable - The identifier for the observable or feature to retrieve config for.
 * @param {object} fallbackConfig - The fallback configuration object to return if dynamic config is unavailable or empty.
 * @returns {object} The dynamic configuration object if available and non-empty, otherwise the fallback config.
 */
async function getDynamicConfigOrFallback(sourceObservable, fallbackConfig) {
  // If any of these environment flags are set, skip dynamic config and return fallback
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK ||
    process.env.CLAUDE_CODE_USE_VERTEX ||
    process.env.DISABLE_TELEMETRY ||
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  ) {
    return fallbackConfig;
  }

  // Attempt to retrieve the dynamic config subscription
  const subscription = await CL();
  if (!subscription) {
    return fallbackConfig;
  }

  // Get the dynamic config for the given observable
  const dynamicConfig = subscription.getDynamicConfig(sourceObservable);

  // If the dynamic config is empty, return the fallback
  if (Object.keys(dynamicConfig.value).length === 0) {
    return fallbackConfig;
  }

  // Return the dynamic config value
  return dynamicConfig.value;
}

module.exports = getDynamicConfigOrFallback;
