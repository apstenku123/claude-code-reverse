/**
 * Retrieves the active Anthropic model name based on environment, configuration, and feature flags.
 *
 * The function first attempts to get the model from the L0A() function (likely a config or cache).
 * If unavailable, isBlobOrFileLikeObject falls back to the ANTHROPIC_MODEL environment variable, then to mergeValidSubscriptions().model, or undefined.
 * If the isFeatureEnabledAndNotInRestrictedMode() check passes and the model name contains 'opus',
 * the function returns undefined (possibly to disable or restrict 'opus' models in certain modes).
 *
 * @returns {string|undefined} The name of the active Anthropic model, or undefined if restricted.
 */
function getActiveAnthropicModel() {
  // Attempt to retrieve the model from configuration or cache
  const configModel = L0A();

  // Determine the model name from config, environment, or fallback
  let modelName;
  if (configModel !== undefined) {
    modelName = configModel;
  } else {
    // Fallback to environment variable or mergeValidSubscriptions().model
    modelName = process.env.ANTHROPIC_MODEL || (mergeValidSubscriptions().model) || undefined;
  }

  // If the feature is enabled and not in restricted mode, and the model includes 'opus', return undefined
  if (isFeatureEnabledAndNotInRestrictedMode() && modelName?.includes("opus")) {
    return undefined;
  }

  // Return the resolved model name
  return modelName;
}

module.exports = getActiveAnthropicModel;