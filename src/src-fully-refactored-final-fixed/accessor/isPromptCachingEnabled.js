/**
 * Determines if prompt caching is enabled based on the DISABLE_PROMPT_CACHING environment variable.
 *
 * This function checks the value of process.env.DISABLE_PROMPT_CACHING and returns true if caching is enabled.
 * Caching is considered enabled unless the environment variable is set to a truthy string (e.g., 'true', 'yes', '1', 'on').
 *
 * @returns {boolean} Returns true if prompt caching is enabled; false otherwise.
 */
function isPromptCachingEnabled() {
  // isTruthyString checks if the string represents a truthy value (e.g., 'true', 'yes', '1', 'on')
  const disablePromptCachingEnv = process.env.DISABLE_PROMPT_CACHING;
  const isCachingDisabled = isTruthyString(disablePromptCachingEnv);
  // Caching is enabled if DISABLE_PROMPT_CACHING is NOT a truthy string
  return !isCachingDisabled;
}

module.exports = isPromptCachingEnabled;