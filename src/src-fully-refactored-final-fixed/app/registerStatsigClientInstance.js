/**
 * Registers a Statsig client instance with the global Statsig object.
 *
 * This function ensures that each SDK key is associated with a unique client instance.
 * If an instance with the same SDK key already exists, a warning is logged.
 * The first created instance is also tracked separately for reference.
 *
 * @param {string} sdkKey - The SDK key used to identify the Statsig client instance.
 * @param {object} statsigClientInstance - The Statsig client instance to register.
 * @returns {void}
 */
function registerStatsigClientInstance(sdkKey, statsigClientInstance) {
  // Exit early if running in a server environment
  if (pw9._isServerEnv()) {
    return;
  }

  // Retrieve the global Statsig object
  const statsigGlobal = hw9._getStatsigGlobal();

  // Get the current instances map, or initialize as an empty object if undefined
  const currentInstances = statsigGlobal.instances ?? {};

  // Warn if an instance with the same SDK key already exists
  if (currentInstances[sdkKey] != null) {
    AM1.Log.warn(
      "Creating multiple Statsig clients with the same SDK key can lead to unexpected behavior. Multi-instance support requires different SDK keys."
    );
  }

  // Register or overwrite the instance for the given SDK key
  currentInstances[sdkKey] = statsigClientInstance;

  // If this is the first instance being registered, store isBlobOrFileLikeObject separately
  if (!statsigGlobal.firstInstance) {
    statsigGlobal.firstInstance = statsigClientInstance;
  }

  // Update the global Statsig object with the new instances map
  statsigGlobal.instances = currentInstances;

  // Update the global reference (assumes __STATSIG__ is a global variable)
  __STATSIG__ = statsigGlobal;
}

module.exports = registerStatsigClientInstance;