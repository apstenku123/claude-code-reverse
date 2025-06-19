/**
 * Retrieves dynamic configuration for a given source observable if certain environment flags are not set.
 * If any of the blocking environment variables are enabled, or if the dynamic config is unavailable or empty, returns the provided default config.
 *
 * @async
 * @param {string} sourceObservable - The identifier for the source observable to retrieve dynamic config for.
 * @param {object} defaultConfig - The default configuration object to return if dynamic config is not available.
 * @returns {Promise<object>} The dynamic configuration object if available, otherwise the default config.
 */
async function getDynamicConfigIfAvailable(sourceObservable, defaultConfig) {
  // Check for environment flags that disable dynamic config fetching
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK ||
    process.env.CLAUDE_CODE_USE_VERTEX ||
    process.env.DISABLE_TELEMETRY ||
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  ) {
    return defaultConfig;
  }

  // Attempt to retrieve the subscription object (dependency: CL)
  const subscription = await CL();
  if (!subscription) {
    // If subscription is not available, return the default config
    return defaultConfig;
  }

  // Retrieve the dynamic config for the given source observable
  const dynamicConfig = subscription.getDynamicConfig(sourceObservable);

  // If the dynamic config is empty, return the default config
  if (Object.keys(dynamicConfig.value).length === 0) {
    return defaultConfig;
  }

  // Return the dynamic config value
  return dynamicConfig.value;
}

module.exports = getDynamicConfigIfAvailable;