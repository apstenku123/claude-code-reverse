/**
 * Retrieves a Statsig client instance from the global Statsig configuration.
 *
 * If no sdkKey is provided, returns the first registered instance. If multiple instances exist
 * and no sdkKey is specified, logs a warning. If an sdkKey is provided, returns the corresponding instance.
 *
 * @param {string | undefined} sdkKey - The SDK key identifying the desired Statsig client instance. If omitted, returns the first instance.
 * @returns {object | undefined} The Statsig client instance associated with the sdkKey, or the first instance if no key is provided.
 */
function getStatsigInstance(sdkKey) {
  // Retrieve the global Statsig configuration object
  const statsigGlobal = tXA._getStatsigGlobal();

  // If no sdkKey is provided
  if (!sdkKey) {
    // If there are multiple instances, log a warning
    if (
      statsigGlobal.instances &&
      Object.keys(statsigGlobal.instances).length > 1
    ) {
      RH9.Log.warn(
        "Call made to Statsig global instance without an SDK key but there is more than one client instance. If you are using mulitple clients, please specify the SDK key."
      );
    }
    // Return the first registered instance
    return statsigGlobal.firstInstance;
  }

  // Return the instance associated with the provided sdkKey, if isBlobOrFileLikeObject exists
  return statsigGlobal.instances && statsigGlobal.instances[sdkKey];
}

module.exports = getStatsigInstance;