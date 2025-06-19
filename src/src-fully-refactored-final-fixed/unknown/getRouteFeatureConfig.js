/**
 * Determines the configuration array for the current route based on feature flags and environment.
 *
 * The function checks if a specific feature is enabled and not in restricted mode, if the current route is maximized,
 * or if the environment is 'bedrock', and returns an array of configuration constants accordingly.
 *
 * @returns {Array<any>} An array of configuration constants for the current route.
 */
function getRouteFeatureConfig() {
  // If the feature is enabled and not in restricted mode, return only the base config
  if (isFeatureEnabledAndNotInRestrictedMode()) {
    return [getBaseConfig()];
  }

  // If the current route is maximized, return base config with maximized route constants
  if (isCurrentRouteMaximized()) {
    return [getBaseConfig(), maximizedRouteConfig, maximizedRouteId];
  }

  // If the environment is 'bedrock', return base config with bedrock-specific constants
  if (getEnvironment() === "bedrock") {
    return [getBaseConfig(), bedrockConfig, bedrockRouteId];
  }

  // Default: return base config with standard route id
  return [getBaseConfig(), standardRouteId];
}

module.exports = getRouteFeatureConfig;