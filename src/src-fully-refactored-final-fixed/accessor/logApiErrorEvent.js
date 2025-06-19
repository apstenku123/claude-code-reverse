/**
 * Logs API error events to analytics and monitoring systems with relevant metadata.
 *
 * @param {Object} params - The parameters for logging the API error event.
 * @param {Error|Object|string} params.error - The error object or message to log.
 * @param {string} params.model - The model name associated with the API request.
 * @param {number} params.messageCount - The number of messages involved in the request.
 * @param {number} params.messageTokens - The number of tokens in the messages.
 * @param {number} params.durationMs - The duration of the API request in milliseconds.
 * @param {number} params.durationMsIncludingRetries - The total duration including retries in milliseconds.
 * @param {number} params.attempt - The attempt number for the API request.
 * @param {string} params.requestId - The unique identifier for the API request.
 * @param {boolean} params.didFallBackToNonStreaming - Indicates if the request fell back to non-streaming mode.
 * @param {string} [params.promptCategory] - Optional category of the prompt.
 * @returns {void}
 */
function logApiErrorEvent({
  error,
  model,
  messageCount,
  messageTokens,
  durationMs,
  durationMsIncludingRetries,
  attempt,
  requestId,
  didFallBackToNonStreaming,
  promptCategory
}) {
  // Extract error message string
  const errorMessage = error instanceof Error ? error.message : String(error);

  // Extract status code if error is an instance of g6, otherwise undefined
  const errorStatus = error instanceof g6 ? String(error.status) : undefined;

  // Perform additional error processing (side effect)
  reportErrorIfAllowed(error);

  // Log error event to analytics system with detailed metadata
  logTelemetryEventIfEnabled("tengu_api_error", {
    model,
    error: errorMessage,
    status: errorStatus,
    messageCount,
    messageTokens,
    durationMs,
    durationMsIncludingRetries,
    attempt,
    provider: xU(),
    requestId: requestId || undefined,
    didFallBackToNonStreaming,
    ...(promptCategory ? { promptCategory } : {})
  });

  // Log error event to monitoring system with a subset of metadata
  SK("api_error", {
    model,
    error: errorMessage,
    status_code: String(errorStatus),
    duration_ms: String(durationMs),
    attempt: String(attempt)
  });
}

module.exports = logApiErrorEvent;