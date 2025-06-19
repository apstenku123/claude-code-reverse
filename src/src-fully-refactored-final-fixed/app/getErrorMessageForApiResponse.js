/**
 * Returns a user-friendly error message or status content based on the API response or error object.
 * Handles various known error cases for Anthropic API and related services, including rate limits, authentication, and quota issues.
 *
 * @param {any} apiResponseOrError - The API response object or Error instance to inspect.
 * @param {string} modelIdentifier - The identifier for the model or service being used (for context in error messages).
 * @param {any} requestContext - Additional context, such as the original request or subscription, used for API key source lookup.
 * @returns {any} An object with a 'content' property containing a user-friendly error message or status string.
 */
function getErrorMessageForApiResponse(apiResponseOrError, modelIdentifier, requestContext) {
  // Handle known error: generic error containing Zc1 string
  if (apiResponseOrError instanceof Error && apiResponseOrError.message.includes(Zc1)) {
    return tY({ content: Gc1 });
  }

  // Handle known error: error message contains Xm string
  if (apiResponseOrError instanceof Error && apiResponseOrError.message.includes(Xm)) {
    return tY({ content: Xm });
  }

  // Handle rate limit error from g6 API response
  if (
    apiResponseOrError instanceof g6 &&
    apiResponseOrError.status === 429 &&
    R6()
  ) {
    // Attempt to extract the rate limit reset time from headers
    const resetHeader = apiResponseOrError.headers?.get?.("anthropic-ratelimit-unified-reset");
    const resetTimestamp = Number(resetHeader) || 0;
    const rateLimitMessage = `${Ic1}|${resetTimestamp}`;
    return tY({ content: rateLimitMessage });
  }

  // Handle error: prompt is too long
  if (
    apiResponseOrError instanceof Error &&
    apiResponseOrError.message.includes("prompt is too long")
  ) {
    return tY({ content: fo });
  }

  // Handle error: credit balance too low
  if (
    apiResponseOrError instanceof Error &&
    apiResponseOrError.message.includes("Your credit balance is too low")
  ) {
    return tY({ content: Qc1 });
  }

  // Handle error: x-api-key missing or invalid
  if (
    apiResponseOrError instanceof Error &&
    apiResponseOrError.message.toLowerCase().includes("x-api-key")
  ) {
    // Determine the source of the API key
    const { source: apiKeySource } = getAnthropicApiKeySource(requestContext);
    const isAnthropicKey = apiKeySource === "ANTHROPIC_API_KEY" || apiKeySource === "apiKeyHelper";
    return tY({ content: isAnthropicKey ? FF1 : WF1 });
  }

  // Handle forbidden error: OAuth token revoked
  if (
    apiResponseOrError instanceof g6 &&
    apiResponseOrError.status === 403 &&
    apiResponseOrError.message.includes("OAuth token has been revoked")
  ) {
    return tY({ content: JF1 });
  }

  // Handle Bedrock model updateSnapshotAndNotify errors if feature flag is enabled
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK &&
    apiResponseOrError instanceof Error &&
    apiResponseOrError.message.toLowerCase().includes("model id")
  ) {
    return tY({ content: `${_Z} (${modelIdentifier}): ${apiResponseOrError.message}` });
  }

  // Handle all other errors
  if (apiResponseOrError instanceof Error) {
    return tY({ content: `${_Z}: ${apiResponseOrError.message}` });
  }

  // Default fallback message
  return tY({ content: _Z });
}

module.exports = getErrorMessageForApiResponse;