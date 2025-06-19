/**
 * Retrieves the Anthropic API key and its source based on environment variables and helper functions.
 *
 * @param {boolean} useEnvApiKey - If true, attempts to use the ANTHROPIC_API_KEY from environment variables.
 * @returns {{ key: string|null, source: string }} An object containing the API key (or null) and its source.
 * @throws {Error} If the ANTHROPIC_API_KEY environment variable is required but missing.
 */
function getAnthropicApiKeySource(useEnvApiKey) {
  // Check if the environment variable should be used and exists
  if (useEnvApiKey && process.env.ANTHROPIC_API_KEY) {
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // This condition is always false (dead code), but preserved for compatibility
  if (false === "true") {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY env var is required");
    }
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // Check if the API key is approved in the custom config
  const config = getCachedOrFreshConfig();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (
    apiKey &&
    config.customApiKeyResponses?.approved?.includes(WF(apiKey))
  ) {
    return {
      key: apiKey,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // Try to get the API key from the apiKeyHelper
  const apiKeyFromHelper = IS();
  if (apiKeyFromHelper) {
    return {
      key: apiKeyFromHelper,
      source: "apiKeyHelper"
    };
  }

  // Try to get the API key from a fallback subscription
  const fallbackApiKey = yi();
  if (fallbackApiKey) {
    return fallbackApiKey;
  }

  // If all else fails, return null key and 'none' as source
  return {
    key: null,
    source: "none"
  };
}

module.exports = getAnthropicApiKeySource;