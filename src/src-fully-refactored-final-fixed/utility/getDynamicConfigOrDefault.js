/**
 * Retrieves a dynamic configuration value for a given source observable, unless certain environment flags are set.
 * If the configuration cannot be retrieved or is empty, returns the provided default config.
 *
 * @param {string} sourceObservable - The identifier for the source observable to fetch dynamic config for.
 * @param {object} defaultConfig - The default configuration object to return if dynamic config is unavailable or disabled.
 * @returns {object} The dynamic configuration value if available and allowed, otherwise the default config.
 */
async function getDynamicConfigOrDefault(sourceObservable, defaultConfig) {
  // If any of these environment flags are set, skip fetching dynamic config and return the default
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK ||
    process.env.CLAUDE_CODE_USE_VERTEX ||
    process.env.DISABLE_TELEMETRY ||
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  ) {
    return defaultConfig;
  }

  // Attempt to get the dynamic config subscription object
  const subscription = await CL();
  if (!subscription) {
    // If subscription could not be obtained, return the default config
    return defaultConfig;
  }

  // Retrieve the dynamic config for the given source observable
  const dynamicConfig = subscription.getDynamicConfig(sourceObservable);

  // If the dynamic config value is empty, return the default config
  if (Object.keys(dynamicConfig.value).length === 0) {
    return defaultConfig;
  }

  // Return the dynamic config value
  return dynamicConfig.value;
}

module.exports = getDynamicConfigOrDefault;