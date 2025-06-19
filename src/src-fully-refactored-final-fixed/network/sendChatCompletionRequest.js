/**
 * Sends a chat completion request to the model API, handling streaming, caching, and error logging.
 *
 * @param {Object} options - The options for the chat completion request.
 * @param {string} options.systemPrompt - The system prompt to provide context to the model.
 * @param {string} options.userPrompt - The user'createInteractionAccessor prompt or message.
 * @param {string} [options.assistantPrompt] - The previous assistant'createInteractionAccessor message, if any.
 * @param {AbortSignal} [options.signal] - Optional abort signal for request cancellation.
 * @param {boolean} [options.isNonInteractiveSession] - Whether the session is non-interactive.
 * @param {number} [options.temperature=0] - Sampling temperature for the model.
 * @param {boolean} [options.enablePromptCaching] - Whether to enable prompt caching.
 * @param {string} [options.promptCategory] - Category of the prompt for analytics.
 * @returns {Promise<Object>} The assistant'createInteractionAccessor response message object, or an error object if the request fails.
 */
async function sendChatCompletionRequest({
  systemPrompt,
  userPrompt,
  assistantPrompt,
  signal,
  isNonInteractiveSession,
  temperature = 0,
  enablePromptCaching,
  promptCategory
}) {
  // Get the current model name
  const modelName = _S();

  // Build the messages array for the chat request
  const messages = [
    { role: "user", content: userPrompt },
    ...(assistantPrompt ? [{ role: "assistant", content: assistantPrompt }] : [])
  ];

  // Prepare system prompt context, possibly with caching
  const systemPromptContext = createTextMessageObjects(systemPrompt, enablePromptCaching && isPromptCachingEnabled());

  // Compose the full prompt for the API
  const fullPrompt = enablePromptCaching
    ? [...systemPromptContext, ...messages]
    : [{ systemPrompt }, ...messages];

  // Log prompt analytics
  Qt1({
    model: modelName,
    messagesLength: JSON.stringify(fullPrompt).length,
    temperature,
    promptCategory
  });

  // Initialize retry and timing variables
  let attempt = 0;
  const startTime = Date.now();
  const startTimeIncludingRetries = Date.now();
  let response = undefined;
  let streamRequest = undefined;
  const betas = TY(modelName);

  try {
    // Attempt the streaming chat completion request with retry logic
    response = await retryWithTokenRefreshAndContextAdjustment(
      () => NK({
        maxRetries: 0,
        model: modelName,
        isNonInteractiveSession,
        isSmallFastModel: true
      }),
      async (api, retryAttempt, context) => {
        // Update attempt and timing
        attempt = retryAttempt;
        const attemptStartTime = Date.now();
        // Start the streaming request
        streamRequest = api.beta.messages.stream({
          model: context.model,
          max_tokens: 512,
          messages,
          system: systemPromptContext,
          temperature,
          metadata: A11(),
          stream: true,
          ...(betas.length > 0 ? { betas } : {}),
          ...buildAnthropicConfigWithExtraBody()
        }, { signal });
        // Await the streaming response
        await processMessageStream(streamRequest);
      },
      {
        showErrors: false,
        model: modelName
      }
    );

    // If a stream request was made, process the response
    if (streamRequest) {
      const { response: streamResponse } = await streamRequest.withResponse();
      updateFallbackWarningThresholdFromHeaders(streamResponse);
    }
  } catch (error) {
    // Handle and log errors
    let apiError = error;
    let errorModel = modelName;
    if (error instanceof TO) {
      apiError = error.originalError;
      errorModel = error.retryContext.model;
    }
    // Log the API error event
    logApiErrorEvent({
      error: apiError,
      model: errorModel,
      messageCount: assistantPrompt ? 2 : 1,
      durationMs: Date.now() - startTime,
      durationMsIncludingRetries: Date.now() - startTimeIncludingRetries,
      attempt,
      requestId: streamRequest?.request_id,
      promptCategory
    });
    // Return the error response
    return handleAnthropicApiError(apiError, errorModel, isNonInteractiveSession);
  }

  // Check for a stop reason and return if present
  const stopReason = handleRefusalResponse(response.stopReason);
  if (stopReason) return stopReason;

  // Build the assistant'createInteractionAccessor response message object
  const assistantMessage = {
    message: enablePromptCaching
      ? {
          ...response.message,
          content: ie(response.message.content)
        }
      : {
          ...response.message,
          content: ie(response.message.content),
          usage: {
            ...response.usage,
            cache_read_input_tokens: 0,
            cache_creation_input_tokens: 0
          }
        },
    uuid: Dt1(),
    requestId: streamRequest?.request_id ?? undefined,
    type: "assistant",
    timestamp: new Date().toISOString()
  };

  // Log the successful completion event
  Gt1({
    model: modelName,
    usage: response.usage,
    start: startTime,
    startIncludingRetries: startTimeIncludingRetries,
    attempt,
    messageCount: assistantPrompt ? 2 : 1,
    messageTokens: findAndProcessLastValidInteraction([assistantMessage]),
    requestId: streamRequest?.request_id ?? null,
    stopReason: response.stopReason,
    ttftMs: response.ttftMs,
    didFallBackToNonStreaming: false,
    promptCategory
  });

  return assistantMessage;
}

module.exports = sendChatCompletionRequest;