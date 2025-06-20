/**
 * Retrieves the name of the Anthropic model to use, based on configuration, environment variables, or defaults.
 *
 * The function first attempts to get a model name from the L0A() function (likely a config provider).
 * If not found, isBlobOrFileLikeObject falls back to the ANTHROPIC_MODEL environment variable, then to mergeValidSubscriptions().model, or undefined.
 * If the resource is available and not in use (as determined by isResourceAvailableAndNotInUse()),
 * and the model name includes 'opus', the function returns undefined (likely to avoid using the 'opus' model in this state).
 * Otherwise, isBlobOrFileLikeObject returns the resolved model name.
 *
 * @returns {string|undefined} The name of the Anthropic model to use, or undefined if not applicable.
 */
function getAnthropicModelName() {
  // Attempt to get the model name from configuration
  const configuredModelName = L0A();

  // Determine the model name from config, environment, or default
  let modelName;
  if (configuredModelName !== undefined) {
    modelName = configuredModelName;
  } else {
    modelName = process.env.ANTHROPIC_MODEL || (mergeValidSubscriptions().model) || undefined;
  }

  // If resource is available and not in use, and model is 'opus', skip using this model
  if (isResourceAvailableAndNotInUse() && modelName?.includes("opus")) {
    return undefined;
  }

  // Return the resolved model name
  return modelName;
}

module.exports = getAnthropicModelName;