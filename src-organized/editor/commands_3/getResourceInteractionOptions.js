/**
 * Determines the appropriate set of resource interaction options based on current resource and interaction states.
 *
 * This function checks the availability and usage status of a resource, as well as the current environment type,
 * and returns an array of options that should be presented to the user or system for further processing.
 *
 * @returns {Array<any>} An array containing the relevant resource interaction options.
 */
function getResourceInteractionOptions() {
  // If the resource is available and not currently in use, return the default interaction option
  if (isResourceAvailableAndNotInUse()) {
    return [getDefaultInteractionOption()];
  }

  // If the maximum interaction is currently active, return the default option plus special interaction options
  if (isMaxInteractionActive()) {
    return [getDefaultInteractionOption(), specialInteractionOption, interactionOption71];
  }

  // If the environment type is 'bedrock', return the default option plus bedrock-specific options
  if (getEnvironmentType() === "bedrock") {
    return [getDefaultInteractionOption(), bedrockOption0, bedrockOption1];
  }

  // In all other cases, return the default option plus a general fallback option
  return [getDefaultInteractionOption(), bedrockOption1];
}

// Export the function for use in other modules
module.exports = getResourceInteractionOptions;
