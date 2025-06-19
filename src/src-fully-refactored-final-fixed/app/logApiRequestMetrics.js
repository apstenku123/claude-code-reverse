/**
 * Logs API request metrics and usage statistics.
 *
 * This function calculates cost and duration metrics for an API request, logs detailed metrics for monitoring,
 * and sends summarized usage statistics for analytics purposes.
 *
 * @param {Object} params - The parameters for logging API request metrics.
 * @param {string} params.model - The model used for the API request.
 * @param {number} params.start - The timestamp (ms) when the request started.
 * @param {number} params.startIncludingRetries - The timestamp (ms) when the request started, including retries.
 * @param {number} params.ttftMs - Time to first token in milliseconds.
 * @param {Object} params.usage - Usage statistics (input/output tokens, cache tokens, etc).
 * @param {number} params.attempt - The attempt number for the request.
 * @param {number} params.messageCount - Number of messages in the request.
 * @param {number} params.messageTokens - Number of tokens in all messages.
 * @param {string} params.requestId - Unique identifier for the request.
 * @param {string} params.stopReason - Reason why the request stopped.
 * @param {boolean} params.didFallBackToNonStreaming - Whether the request fell back to non-streaming mode.
 * @param {string} params.promptCategory - Category of the prompt used.
 * @returns {void}
 */
function logApiRequestMetrics({
  model,
  start,
  startIncludingRetries,
  ttftMs,
  usage,
  attempt,
  messageCount,
  messageTokens,
  requestId,
  stopReason,
  didFallBackToNonStreaming,
  promptCategory
}) {
  // Calculate cost and duration metrics based on model, usage, and start times
  const {
    stickerCostUSD,
    costUSD,
    durationMs,
    durationMsIncludingRetries
  } = calculateStickerAndFinalCostsWithDurations(model, usage, start, startIncludingRetries);

  // Log detailed metrics for monitoring
  TZ5({
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
  });

  // Send summarized usage statistics for analytics
  SK("api_request", {
    model,
    input_tokens: String(usage.input_tokens),
    output_tokens: String(usage.output_tokens),
    cache_read_tokens: String(usage.cache_read_input_tokens),
    cache_creation_tokens: String(usage.cache_creation_input_tokens),
    cost_usd: String(costUSD),
    duration_ms: String(durationMs)
  });
}

module.exports = logApiRequestMetrics;