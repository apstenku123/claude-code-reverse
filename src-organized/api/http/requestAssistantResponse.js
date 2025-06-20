/**
 * Sends a prompt to the assistant model and returns the assistant'createInteractionAccessor response.
 * Handles prompt caching, streaming, error logging, and usage analytics.
 *
 * @param {Object} params - The parameters for the assistant request.
 * @param {string} params.systemPrompt - The system-level prompt for the assistant.
 * @param {string} params.userPrompt - The user'createInteractionAccessor prompt message.
 * @param {string} [params.assistantPrompt] - The assistant'createInteractionAccessor previous message, if any.
 * @param {AbortSignal} params.signal - The abort signal for request cancellation.
 * @param {boolean} params.isNonInteractiveSession - Whether the session is non-interactive.
 * @param {number} [params.temperature=0] - The sampling temperature for the model.
 * @param {boolean} params.enablePromptCaching - Whether prompt caching is enabled.
 * @param {string} params.promptCategory - The category of the prompt for analytics.
 * @returns {Promise<Object>} The assistant'createInteractionAccessor response message object, or an error/fallback if applicable.
 */
async function requestAssistantResponse({
  systemPrompt,
  userPrompt,
  assistantPrompt,
  signal,
  isNonInteractiveSession,
  temperature = 0,
  enablePromptCaching,
  promptCategory
}) {
  // Get the current model to use
  const model = _S();

  // Build the message sequence for the conversation
  const messages = [
    { role: "user", content: userPrompt },
    ...(assistantPrompt ? [{ role: "assistant", content: assistantPrompt }] : [])
  ];

  // Prepare the system prompt (possibly with caching)
  const systemPromptArray = createTextMessageObjects(systemPrompt, enablePromptCaching && isPromptCachingEnabled());

  // Compose the full prompt sequence, with or without caching
  const promptSequence = enablePromptCaching
    ? [...systemPromptArray, ...messages]
    : [{ systemPrompt }, ...messages];

  // Send analytics about the query
  Qt1({
    model,
    messagesLength: JSON.stringify(promptSequence).length,
    temperature,
    promptCategory
  });

  let attemptCount = 0;
  const startTime = Date.now();
  const startTimeIncludingRetries = Date.now();
  let assistantResponse;
  let streamRequest;
  const betaFlags = TY(model);

  try {
    // Attempt to get a streaming response from the assistant model
    assistantResponse = await retryWithTokenRefreshAndContextAdjustment(
      () => NK({
        maxRetries: 0,
        model,
        isNonInteractiveSession,
        isSmallFastModel: true
      }),
      async (requestContext, retryAttempt, requestParams) => {
        attemptCount = retryAttempt;
        // Update start time for this attempt
        const attemptStartTime = Date.now();
        // Initiate the streaming request
        streamRequest = requestContext.beta.messages.stream({
          model: requestParams.model,
          max_tokens: 512,
          messages,
          system: systemPromptArray,
          temperature,
          metadata: A11(),
          stream: true,
          ...(betaFlags.length > 0 ? { betas: betaFlags } : {}),
          ...buildAnthropicConfigWithExtraBody()
        }, { signal });
        // Await the streaming response
        return await processMessageStream(streamRequest);
      },
      {
        showErrors: false,
        model
      }
    );

    // If a stream request was made, process the response
    if (streamRequest) {
      const streamResponse = (await streamRequest.withResponse()).response;
      updateFallbackWarningThresholdFromHeaders(streamResponse);
    }
  } catch (error) {
    // Error handling and logging
    let apiError = error;
    let errorModel = model;
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
      attempt: attemptCount,
      requestId: streamRequest?.request_id,
      promptCategory
    });
    // Return the error handler'createInteractionAccessor result
    return handleAnthropicApiError(apiError, errorModel, isNonInteractiveSession);
  }

  // Check for stop reason and handle if present
  const stopReasonResult = handleRefusalResponse(assistantResponse.stopReason);
  if (stopReasonResult) return stopReasonResult;

  // Build the assistant message object
  const assistantMessage = {
    message: enablePromptCaching
      ? {
          ...assistantResponse.message,
          content: ie(assistantResponse.message.content)
        }
      : {
          ...assistantResponse.message,
          content: ie(assistantResponse.message.content),
          usage: {
            ...assistantResponse.usage,
            cache_read_input_tokens: 0,
            cache_creation_input_tokens: 0
          }
        },
    uuid: Dt1(),
    requestId: streamRequest?.request_id ?? undefined,
    type: "assistant",
    timestamp: new Date().toISOString()
  };

  // Send analytics about the response
  Gt1({
    model,
    usage: assistantResponse.usage,
    start: startTime,
    startIncludingRetries: startTimeIncludingRetries,
    attempt: attemptCount,
    messageCount: assistantPrompt ? 2 : 1,
    messageTokens: findAndProcessLastValidInteraction([assistantMessage]),
    requestId: streamRequest?.request_id ?? null,
    stopReason: assistantResponse.stopReason,
    ttftMs: assistantResponse.ttftMs,
    didFallBackToNonStreaming: false,
    promptCategory
  });

  return assistantMessage;
}

module.exports = requestAssistantResponse;