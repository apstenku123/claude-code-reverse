/**
 * Handles errors and responses from Anthropic API interactions, mapping them to user-friendly messages or error codes.
 *
 * @param {Error|g6} apiResponse - The error or response object from the Anthropic API request.
 * @param {string} modelId - The model identifier or configuration string related to the request.
 * @param {any} requestContext - The context or metadata related to the request (used for API key source lookup).
 * @returns {object} An object with a 'content' property containing a user-facing message or error code.
 */
function handleAnthropicApiError(apiResponse, modelId, requestContext) {
  // Handle specific error message containing Zc1
  if (apiResponse instanceof Error && apiResponse.message.includes(Zc1)) {
    return tY({ content: Gc1 });
  }

  // Handle error message containing Xm
  if (apiResponse instanceof Error && apiResponse.message.includes(Xm)) {
    return tY({ content: Xm });
  }

  // Handle rate limit error (status 429) from g6 instance and R6() returns true
  if (apiResponse instanceof g6 && apiResponse.status === 429 && R6()) {
    // Attempt to get the unified reset time from headers
    const resetHeader = apiResponse.headers?.get?.("anthropic-ratelimit-unified-reset");
    const resetTimestamp = Number(resetHeader) || 0;
    const rateLimitMessage = `${Ic1}|${resetTimestamp}`;
    return tY({ content: rateLimitMessage });
  }

  // Handle prompt too long error
  if (apiResponse instanceof Error && apiResponse.message.includes("prompt is too long")) {
    return tY({ content: fo });
  }

  // Handle low credit balance error
  if (apiResponse instanceof Error && apiResponse.message.includes("Your credit balance is too low")) {
    return tY({ content: Qc1 });
  }

  // Handle missing or invalid API key error
  if (
    apiResponse instanceof Error &&
    apiResponse.message.toLowerCase().includes("x-api-key")
  ) {
    // Determine the source of the API key
    const { source: apiKeySource } = getAnthropicApiKeySource(requestContext);
    const isAnthropicKey = apiKeySource === "ANTHROPIC_API_KEY" || apiKeySource === "apiKeyHelper";
    return tY({ content: isAnthropicKey ? FF1 : WF1 });
  }

  // Handle OAuth token revoked error (status 403)
  if (
    apiResponse instanceof g6 &&
    apiResponse.status === 403 &&
    apiResponse.message.includes("OAuth token has been revoked")
  ) {
    return tY({ content: JF1 });
  }

  // Handle model id error when using Bedrock integration
  if (
    process.env.CLAUDE_CODE_USE_BEDROCK &&
    apiResponse instanceof Error &&
    apiResponse.message.toLowerCase().includes("model id")
  ) {
    return tY({ content: `${_Z} (${modelId}): ${apiResponse.message}` });
  }

  // Handle any other error
  if (apiResponse instanceof Error) {
    return tY({ content: `${_Z}: ${apiResponse.message}` });
  }

  // Default fallback message
  return tY({ content: _Z });
}

module.exports = handleAnthropicApiError;