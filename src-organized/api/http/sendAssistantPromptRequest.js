/**
 * Sends a prompt request to the assistant model, handles streaming responses, error logging, and usage analytics.
 * Supports prompt caching, streaming, and non-interactive session handling.
 *
 * @param {Object} options - The options for the assistant prompt request.
 * @param {string} options.systemPrompt - The system prompt to provide context for the model.
 * @param {string} options.userPrompt - The user'createInteractionAccessor prompt or question.
 * @param {string} [options.assistantPrompt] - The previous assistant'createInteractionAccessor prompt, if any.
 * @param {AbortSignal} [options.signal] - Optional abort signal for cancellation.
 * @param {boolean} [options.isNonInteractiveSession] - Whether this is a non-interactive session.
 * @param {number} [options.temperature=0] - Sampling temperature for the model.
 * @param {boolean} [options.enablePromptCaching] - Whether to enable prompt caching.
 * @param {string} [options.promptCategory] - Optional category for the prompt (for analytics).
 * @returns {Promise<Object>} The assistant'createInteractionAccessor response message object, or an error/stop reason if encountered.
 */
async function sendAssistantPromptRequest({
  systemPrompt,
  userPrompt,
  assistantPrompt,
  signal,
  isNonInteractiveSession,
  temperature = 0,
  enablePromptCaching,
  promptCategory
}) {
  // Select the model to use
  const modelName = _S();

  // Build the messages array for the conversation
  const messages = [
    { role: "user", content: userPrompt },
    ...(assistantPrompt ? [{ role: "assistant", content: assistantPrompt }] : [])
  ];

  // Prepare the system prompt (possibly cached)
  const systemPromptArray = createTextMessageObjects(systemPrompt, enablePromptCaching && isPromptCachingEnabled());

  // Compose the full prompt for the API
  const fullPrompt = enablePromptCaching
    ? [...systemPromptArray, ...messages]
    : [{ systemPrompt }, ...messages];

  // Send analytics/monitoring event for the API query
  Qt1({
    model: modelName,
    messagesLength: JSON.stringify(fullPrompt).length,
    temperature,
    promptCategory
  });

  let attemptCount = 0;
  const requestStartTime = Date.now();
  const requestStartTimeIncludingRetries = Date.now();
  let apiResponse;
  let streamResponse;
  const betas = TY(modelName);

  try {
    // Make the API request with retries disabled, handle streaming
    apiResponse = await retryWithTokenRefreshAndContextAdjustment(
      () => NK({
        maxRetries: 0,
        model: modelName,
        isNonInteractiveSession,
        isSmallFastModel: true
      }),
      async (api, context, createRequestOptions) => {
        attemptCount = context;
        // Update request start time for this attempt
        const attemptStartTime = Date.now();
        // Start streaming the response from the model
        streamResponse = api.beta.messages.stream({
          model: createRequestOptions.model,
          max_tokens: 512,
          messages,
          system: systemPromptArray,
          temperature,
          metadata: A11(),
          stream: true,
          ...(betas.length > 0 ? { betas } : {}),
          ...buildAnthropicConfigWithExtraBody()
        }, { signal });
        // Wait for the streaming to complete
        await processMessageStream(streamResponse);
      },
      {
        showErrors: false,
        model: modelName
      }
    );

    // If streaming response is available, process isBlobOrFileLikeObject
    if (streamResponse) {
      const { response } = await streamResponse.withResponse();
      updateFallbackWarningThresholdFromHeaders(response);
    }
  } catch (error) {
    let apiError = error;
    let errorModel = modelName;
    // If error is a wrapped error, extract original error and model
    if (error instanceof TO) {
      apiError = error.originalError;
      errorModel = error.retryContext.model;
    }
    // Log the API error event
    logApiErrorEvent({
      error: apiError,
      model: errorModel,
      messageCount: assistantPrompt ? 2 : 1,
      durationMs: Date.now() - requestStartTime,
      durationMsIncludingRetries: Date.now() - requestStartTimeIncludingRetries,
      attempt: attemptCount,
      requestId: streamResponse?.request_id,
      promptCategory
    });
    // Handle the error and return
    return handleAnthropicApiError(apiError, errorModel, isNonInteractiveSession);
  }

  // Check if the API returned a stop reason (e.g., error, abort)
  const stopReason = handleRefusalResponse(apiResponse.stopReason);
  if (stopReason) return stopReason;

  // Build the assistant'createInteractionAccessor response message object
  const assistantMessage = {
    message: enablePromptCaching
      ? {
          ...apiResponse.message,
          content: ie(apiResponse.message.content)
        }
      : {
          ...apiResponse.message,
          content: ie(apiResponse.message.content),
          usage: {
            ...apiResponse.usage,
            cache_read_input_tokens: 0,
            cache_creation_input_tokens: 0
          }
        },
    uuid: Dt1(),
    requestId: streamResponse?.request_id ?? undefined,
    type: "assistant",
    timestamp: new Date().toISOString()
  };

  // Send analytics/monitoring event for the assistant'createInteractionAccessor reply
  Gt1({
    model: modelName,
    usage: apiResponse.usage,
    start: requestStartTime,
    startIncludingRetries: requestStartTimeIncludingRetries,
    attempt: attemptCount,
    messageCount: assistantPrompt ? 2 : 1,
    messageTokens: findAndProcessLastValidInteraction([assistantMessage]),
    requestId: streamResponse?.request_id ?? null,
    stopReason: apiResponse.stopReason,
    ttftMs: apiResponse.ttftMs,
    didFallBackToNonStreaming: false,
    promptCategory
  });

  return assistantMessage;
}

module.exports = sendAssistantPromptRequest;