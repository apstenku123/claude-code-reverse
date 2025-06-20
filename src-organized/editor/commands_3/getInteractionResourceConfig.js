/**
 * Determines the configuration array for the current interaction resource based on its state and route type.
 *
 * This function checks if the resource is active and not disabled, if the current route is a 'max' interaction route,
 * or if the resource type is 'bedrock', and returns an array of configuration values accordingly.
 *
 * @returns {Array<any>} An array containing the resource configuration values based on the current state.
 */
function getInteractionResourceConfig() {
  // If the resource is active and not disabled, return the single configuration
  if (isResourceActiveAndNotDisabled()) {
    return [getResourceConfig()];
  }

  // If the current interaction route is marked as 'max', return the configuration with max route indicators
  if (isMaxInteractionRoute()) {
    return [getResourceConfig(), maxRouteConfig, interactionId];
  }

  // If the resource type is 'bedrock', return the configuration with bedrock indicators
  if (getResourceType() === "bedrock") {
    return [getResourceConfig(), bedrockConfig, byResourceConfig];
  }

  // Default case: return the configuration with byResource indicator
  return [getResourceConfig(), byResourceConfig];
}

module.exports = getInteractionResourceConfig;