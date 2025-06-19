/**
 * Retrieves a configuration value by key, validating the key based on the config scope (global or local).
 * Logs an error and exits the process if the key is invalid for the given scope.
 *
 * @param {string} configKey - The configuration key to retrieve.
 * @param {boolean} isGlobal - Whether to retrieve from the global config (true) or local config (false).
 * @returns {any} The value associated with the config key from the appropriate config object.
 */
function getConfigValueByKey(configKey, isGlobal) {
  // Log the config get interaction (side effect, does not affect return value)
  logTelemetryEventIfEnabled("tengu_config_get", {
    key: configKey,
    global: isGlobal
  });

  if (isGlobal) {
    // Validate the key for global config
    if (!Ry1(configKey)) {
      // If invalid, log error with valid global keys and exit
      console.error(`Error: '${configKey}' is not a valid config key. Valid keys are: ${pn.join(", ")}`);
      process.exit(1);
    }
    // Return the value from the global config object
    return getCachedOrFreshConfig()[configKey];
  } else {
    // Validate the key for local config
    if (!Oy1(configKey)) {
      // If invalid, log error with valid local keys and exit
      console.error(`Error: '${configKey}' is not a valid config key. Valid keys are: ${cn.join(", ")}`);
      process.exit(1);
    }
    // Return the value from the local config object
    return getProjectSubscriptionConfig()[configKey];
  }
}

module.exports = getConfigValueByKey;