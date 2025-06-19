/**
 * Retrieves the appropriate API key and its source for the application.
 *
 * The function checks for the presence of the ANTHROPIC_API_KEY environment variable and other sources
 * to determine the correct API key to use. It returns an object containing the API key and its source.
 *
 * @param {boolean} useEnvApiKey - If true, prefer the ANTHROPIC_API_KEY environment variable.
 * @returns {{ key: string|null, source: string }} An object with the API key and its source.
 * @throws {Error} If the ANTHROPIC_API_KEY environment variable is required but missing.
 */
function createApiKeyHelper(useEnvApiKey) {
  // Check if the environment variable should be used and is present
  if (useEnvApiKey && process.env.ANTHROPIC_API_KEY) {
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // This block is never executed because (!1 === "true") is always false
  // Preserved for exact functionality
  if (!1 === "true") {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY env var is required");
    }
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // Check if the API key is approved in the custom API key responses
  const config = getCachedOrFreshConfig(); // getCachedOrFreshConfig
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

  // Attempt to retrieve the API key from the apiKeyHelper
  const apiKeyFromHelper = IS();
  if (apiKeyFromHelper) {
    return {
      key: apiKeyFromHelper,
      source: "apiKeyHelper"
    };
  }

  // Attempt to retrieve the API key from another subscription source
  const apiKeyFromSubscription = yi();
  if (apiKeyFromSubscription) {
    return apiKeyFromSubscription;
  }

  // Default: no API key found
  return {
    key: null,
    source: "none"
  };
}

module.exports = createApiKeyHelper;
