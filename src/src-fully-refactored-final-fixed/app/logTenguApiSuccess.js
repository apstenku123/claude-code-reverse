/**
 * Logs a successful Tengu API call with detailed usage and cost metrics.
 *
 * @param {Object} params - The parameters for logging the API success event.
 * @param {string} params.model - The model used for the API call.
 * @param {number} params.messageCount - The number of messages in the conversation.
 * @param {number} params.messageTokens - The total number of tokens in the messages.
 * @param {Object} params.usage - Usage statistics for the API call.
 * @param {number} params.usage.input_tokens - Number of input tokens used.
 * @param {number} params.usage.output_tokens - Number of output tokens generated.
 * @param {number} [params.usage.cache_read_input_tokens] - Number of input tokens read from cache (optional).
 * @param {number} [params.usage.cache_creation_input_tokens] - Number of input tokens created in cache (optional).
 * @param {number} params.durationMs - Duration of the API call in milliseconds.
 * @param {number} params.durationMsIncludingRetries - Total duration including retries in milliseconds.
 * @param {number} params.attempt - The attempt number for the API call.
 * @param {number} [params.ttftMs] - Time to first token in milliseconds (optional).
 * @param {string} [params.requestId] - Unique identifier for the request (optional).
 * @param {string} [params.stopReason] - Reason why the API call stopped (optional).
 * @param {number} params.stickerCostUSD - Cost of stickers in USD.
 * @param {number} params.costUSD - Total cost in USD.
 * @param {boolean} params.didFallBackToNonStreaming - Whether the call fell back to non-streaming mode.
 * @param {string} [params.promptCategory] - Category of the prompt (optional).
 * @returns {void}
 */
function logTenguApiSuccess({
  model,
  messageCount,
  messageTokens,
  usage,
  durationMs,
  durationMsIncludingRetries,
  attempt,
  ttftMs,
  requestId,
  stopReason,
  stickerCostUSD,
  costUSD,
  didFallBackToNonStreaming,
  promptCategory
}) {
  // Prepare the event payload for logging
  const eventPayload = {
    model,
    messageCount,
    messageTokens,
    inputTokens: usage.input_tokens,
    outputTokens: usage.output_tokens,
    cachedInputTokens: usage.cache_read_input_tokens ?? 0, // Default to 0 if undefined
    uncachedInputTokens: usage.cache_creation_input_tokens ?? 0, // Default to 0 if undefined
    durationMs,
    durationMsIncludingRetries,
    attempt,
    ttftMs: ttftMs ?? undefined, // Explicitly set to undefined if not provided
    provider: xU(), // External call to get provider info
    requestId: requestId ?? undefined,
    stop_reason: stopReason ?? undefined,
    stickerCostUSD,
    costUSD,
    didFallBackToNonStreaming
  };

  // Include promptCategory only if isBlobOrFileLikeObject is provided
  if (promptCategory) {
    eventPayload.promptCategory = promptCategory;
  }

  // Log the API success event
  logTelemetryEventIfEnabled("tengu_api_success", eventPayload);
}

module.exports = logTenguApiSuccess;
