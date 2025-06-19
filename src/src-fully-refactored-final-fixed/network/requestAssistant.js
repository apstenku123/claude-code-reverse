/**
 * Sends a request to the assistant model, handling prompt construction, streaming, error logging, and usage analytics.
 *
 * @param {Object} params - The parameters for the assistant request.
 * @param {string} params.systemPrompt - The system prompt to provide context to the assistant.
 * @param {string} params.userPrompt - The user'createInteractionAccessor input prompt.
 * @param {string} [params.assistantPrompt] - The previous assistant'createInteractionAccessor response, if any.
 * @param {AbortSignal} [params.signal] - Optional AbortSignal to cancel the request.
 * @param {boolean} [params.isNonInteractiveSession] - Whether the session is non-interactive.
 * @param {number} [params.temperature=0] - Sampling temperature for the model.
 * @param {boolean} [params.enablePromptCaching] - Whether to enable prompt caching.
 * @param {string} [params.promptCategory] - Category of the prompt for analytics.
 * @returns {Promise<Object>} Returns a message object with assistant'createInteractionAccessor response and metadata, or throws/logs error if failed.
 */
async function requestAssistant({
  systemPrompt,
  userPrompt,
  assistantPrompt,
  signal,
  isNonInteractiveSession,
  temperature = 0,
  enablePromptCaching,
  promptCategory
}) {
  // Get the model name to use
  const model = _S();

  // Build the messages array for the conversation
  const messages = [
    { role: "user", content: userPrompt },
    ...(assistantPrompt ? [{ role: "assistant", content: assistantPrompt }] : [])
  ];

  // If prompt caching is enabled, get the system prompt array accordingly
  const systemPromptArray = createTextMessageObjects(systemPrompt, enablePromptCaching && isPromptCachingEnabled());

  // Compose the full prompt array for the request
  const fullPromptArray = enablePromptCaching
    ? [...systemPromptArray, ...messages]
    : [{ systemPrompt }, ...messages];

  // Log prompt analytics
  Qt1({
    model,
    messagesLength: JSON.stringify(fullPromptArray).length,
    temperature,
    promptCategory
  });

  let attempt = 0;
  const requestStartTime = Date.now();
  const requestStartTimeIncludingRetries = Date.now();
  let response = undefined;
  let streamRequest = undefined;
  const modelBetas = TY(model);

  try {
    // retryWithTokenRefreshAndContextAdjustment handles retries and error handling for the NK streaming request
    response = await retryWithTokenRefreshAndContextAdjustment(
      () => NK({
        maxRetries: 0,
        model,
        isNonInteractiveSession,
        isSmallFastModel: true
      }),
      async (nkResult, context, nkParams) => {
        // Update attempt and request start time for this try
        attempt = context;
        const streamStartTime = Date.now();
        // Start the streaming request
        streamRequest = nkResult.beta.messages.stream({
          model: nkParams.model,
          max_tokens: 512,
          messages,
          system: systemPromptArray,
          temperature,
          metadata: A11(),
          stream: true,
          ...(modelBetas.length > 0 ? { betas: modelBetas } : {}),
          ...buildAnthropicConfigWithExtraBody()
        }, {
          signal
        });
        // Await the streaming response
        await processMessageStream(streamRequest);
      },
      {
        showErrors: false,
        model
      }
    );

    // If handleMissingDoctypeError have a streamRequest, get the response and process isBlobOrFileLikeObject
    if (streamRequest) {
      const streamResponse = (await streamRequest.withResponse()).response;
      updateFallbackWarningThresholdFromHeaders(streamResponse);
    }
  } catch (error) {
    let apiError = error;
    let errorModel = model;
    // If error is a TO (likely a wrapped error), extract originalError and retryContext
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
      attempt,
      requestId: streamRequest?.request_id,
      promptCategory
    });
    // Return the error handler result
    return handleAnthropicApiError(apiError, errorModel, isNonInteractiveSession);
  }

  // Check for stop reason and handle if present
  const stopReasonResult = handleRefusalResponse(response.stopReason);
  if (stopReasonResult) {
    return stopReasonResult;
  }

  // Build the final message object to return
  const messageObject = {
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

  // Log usage analytics
  Gt1({
    model,
    usage: response.usage,
    start: requestStartTime,
    startIncludingRetries: requestStartTimeIncludingRetries,
    attempt,
    messageCount: assistantPrompt ? 2 : 1,
    messageTokens: findAndProcessLastValidInteraction([messageObject]),
    requestId: streamRequest?.request_id ?? null,
    stopReason: response.stopReason,
    ttftMs: response.ttftMs,
    didFallBackToNonStreaming: false,
    promptCategory
  });

  return messageObject;
}

module.exports = requestAssistant;