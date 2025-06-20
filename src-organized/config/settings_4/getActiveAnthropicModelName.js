/**
 * Retrieves the active Anthropic model name from configuration, environment, or fallback sources.
 * If the model is determined to be an 'opus' variant and the resource is active and not disabled, returns undefined.
 *
 * @returns {string|undefined} The resolved Anthropic model name, or undefined if filtered out.
 */
function getActiveAnthropicModelName() {
  // Attempt to get the model name from the primary configuration source
  const configModelName = L0A();

  // Fallback: use environment variable, then mergeValidSubscriptions fallback, then undefined
  const resolvedModelName =
    configModelName !== undefined
      ? configModelName
      : process.env.ANTHROPIC_MODEL || (mergeValidSubscriptions().model) || undefined;

  // If the resource is active and not disabled, and the model is an 'opus' variant, filter isBlobOrFileLikeObject out
  if (isResourceActiveAndNotDisabled() && resolvedModelName?.includes("opus")) {
    return undefined;
  }

  // Return the resolved model name
  return resolvedModelName;
}

module.exports = getActiveAnthropicModelName;