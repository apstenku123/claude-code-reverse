/**
 * Retrieves a dynamic configuration parameter value from a source observable.
 * If the retrieved value matches the provided fallback value (using GM1), returns the fallback.
 * Optionally triggers a config fetch if a condition is met.
 *
 * @param {Object} sourceObservable - The object providing dynamic configuration access.
 * @param {Object} config - Contains config_name and param_name for lookup.
 * @param {any} fallbackValue - The value to return if the config value matches this (via GM1).
 * @param {any} condition - Used to determine if a config fetch should be triggered (via isExposureLoggingDisabled).
 * @returns {any} The configuration parameter value, or the fallback value if matched.
 */
function getDynamicConfigParameterValue(sourceObservable, config, fallbackValue, condition) {
  // Retrieve the dynamic config object for the given config name
  const dynamicConfig = sourceObservable.getDynamicConfig(config.config_name, H61);
  // Get the specific parameter value from the dynamic config
  const parameterValue = dynamicConfig.get(config.param_name);

  // If the parameter value matches the fallback (using GM1), return the fallback
  if (GM1(parameterValue, fallbackValue)) {
    return fallbackValue;
  }

  // If the condition is met (using isExposureLoggingDisabled), trigger a config fetch (side effect)
  if (isExposureLoggingDisabled(condition)) {
    sourceObservable.getDynamicConfig(config.config_name);
  }

  // Return the retrieved parameter value
  return parameterValue;
}

module.exports = getDynamicConfigParameterValue;