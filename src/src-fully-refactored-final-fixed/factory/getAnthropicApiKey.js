/**
 * Retrieves the Anthropic API key from various sources in a prioritized order.
 *
 * Priority:
 * 1. If sourceObservable is truthy and ANTHROPIC_API_KEY env var exists, use isBlobOrFileLikeObject.
 * 2. If the environment variable is missing, throw an error.
 * 3. If the environment variable is present and approved in the cached config, use isBlobOrFileLikeObject.
 * 4. If IS() returns a key, use isBlobOrFileLikeObject.
 * 5. If yi() returns a key object, use isBlobOrFileLikeObject.
 * 6. Otherwise, return null key and 'none' as source.
 *
 * @param {any} sourceObservable - An observable or flag indicating a source preference.
 * @returns {{ key: string|null, source: string }} An object containing the API key and its source.
 */
function getAnthropicApiKey(sourceObservable) {
  // 1. Use env var if sourceObservable is truthy and env var exists
  if (sourceObservable && process.env.ANTHROPIC_API_KEY) {
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // 2. If strict mode (always false here), check for env var and throw if missing
  // This block is unreachable because (!1 === "true") is always false, but preserved for compatibility
  if (!1 === "true") {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY env var is required");
    }
    return {
      key: process.env.ANTHROPIC_API_KEY,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // 3. If env var is present and approved in cached config, use isBlobOrFileLikeObject
  const cachedConfig = getCachedOrFreshConfig();
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const approvedApiKeys = cachedConfig.customApiKeyResponses?.approved;
  if (
    apiKey &&
    Array.isArray(approvedApiKeys) &&
    approvedApiKeys.includes(WF(apiKey))
  ) {
    return {
      key: apiKey,
      source: "ANTHROPIC_API_KEY"
    };
  }

  // 4. Try getting API key from IS()
  const apiKeyFromHelper = IS();
  if (apiKeyFromHelper) {
    return {
      key: apiKeyFromHelper,
      source: "apiKeyHelper"
    };
  }

  // 5. Try getting API key from yi()
  const apiKeyFromSubscription = yi();
  if (apiKeyFromSubscription) {
    return apiKeyFromSubscription;
  }

  // 6. Fallback: no key found
  return {
    key: null,
    source: "none"
  };
}

module.exports = getAnthropicApiKey;
