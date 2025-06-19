/**
 * Retrieves the name of the small, fast Anthropic model to use.
 *
 * The function first checks if the environment variable `ANTHROPIC_SMALL_FAST_MODEL` is set.
 * If isBlobOrFileLikeObject is, that value is returned. Otherwise, isBlobOrFileLikeObject falls back to the default model name
 * provided by the `haiku35` property of the object returned by the `getAnthropicModels` function.
 *
 * @returns {string} The name of the small, fast Anthropic model to use.
 */
function getSmallFastModelName() {
  // Check for an explicit environment variable override
  if (process.env.ANTHROPIC_SMALL_FAST_MODEL) {
    return process.env.ANTHROPIC_SMALL_FAST_MODEL;
  }
  // Fallback to the default model name from the Anthropic models provider
  return getAnthropicModels().haiku35;
}

// Assumes getAnthropicModels is defined elsewhere and returns an object with a haiku35 property
module.exports = getSmallFastModelName;
