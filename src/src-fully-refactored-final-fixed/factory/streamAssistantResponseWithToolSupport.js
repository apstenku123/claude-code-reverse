/**
 * Streams an assistant'createInteractionAccessor response, supporting tool usage, streaming and non-streaming fallbacks, and detailed analytics.
 * Handles Tengu off-switch, tool permission context, message formatting, token budgeting, and error logging.
 *
 * @async
 * @generator
 * @param {Array} userMessages - Array of user/assistant messages to include in the prompt.
 * @param {Array} systemPrompts - Array of system prompt messages.
 * @param {number} maxOutputTokens - Maximum number of output tokens allowed in the response.
 * @param {Array} toolDefinitions - Array of tool definitions available for the assistant.
 * @param {AbortSignal} abortSignal - Signal to abort the streaming request.
 * @param {Object} options - Additional options and configuration for the request.
 * @yields {Object} Stream events, message objects, or error objects as the assistant responds.
 */
async function* streamAssistantResponseWithToolSupport(
  userMessages,
  systemPrompts,
  maxOutputTokens,
  toolDefinitions,
  abortSignal,
  options
) {
  // Check for Tengu off-switch and early exit if activated
  if (
    !R6() &&
    (await kb("tengu-off-switch", { activated: false })).activated &&
    isOpus40Observable(options.model)
  ) {
    logTelemetryEventIfEnabled("tengu_off_switch_query", {});
    yield handleAnthropicApiError(new Error(Xm), options.model, options.isNonInteractiveSession);
    return;
  }

  // Prepare tool schemas and beta flags
  const [toolSchemas, betaFlags] = await Promise.all([
    Promise.all(
      toolDefinitions.map(toolDef =>
        buildToolMetadata(toolDef, {
          getToolPermissionContext: options.getToolPermissionContext,
          tools: toolDefinitions
        })
      )
    ),
    TY(options.model)
  ]);

  // Optionally prepend CLI system prompt
  if (options.prependCLISysprompt) {
    reportSyspromptBlockSnippet(systemPrompts);
    systemPrompts = [$handleInputCharacterCode(), ...systemPrompts];
  }

  // Format system prompts for the model
  const formattedSystemPrompts = createTextMessageObjects(systemPrompts);
  const hasBetaFlags = isPromptCachingEnabled() && betaFlags.length > 0;
  const temperature = options.temperature ?? fZ5;
  const filteredUserMessages = DC(userMessages);

  // Send analytics event for the API query
  Qt1({
    model: options.model,
    messagesLength: JSON.stringify([
      ...formattedSystemPrompts,
      ...filteredUserMessages,
      ...toolSchemas,
      ...(options.extraToolSchemas ?? [])
    ]).length,
    temperature,
    betas: hasBetaFlags ? betaFlags : [],
    permissionMode: options.getToolPermissionContext().mode
  });

  // Timing and tracking variables
  const startIncludingRetries = Date.now();
  let streamStartTime = Date.now();
  let attemptCount = 0;
  let streamingResponse = undefined;
  let tokenBudget = 0;
  let apiRequestId = null;
  let didFallBackToNonStreaming = false;
  let firstChunkLatencyMs = 0;
  let stopReason = null;
  let messageEnvelope = undefined;
  let toolContentBlocks = [];
  let tokenUsageStats = od;
  let maxTokensUsed = 0;
  const streamedMessages = [];

  // Helper to build the request payload for the model
  const buildModelRequestPayload = requestContext => {
    const budgetTokens = requestContext.maxTokensOverride
      ? Math.min(maxOutputTokens, requestContext.maxTokensOverride - 1)
      : maxOutputTokens;
    let interleavedThinking = undefined;
    if (
      !isTruthyString(process.env.DISABLE_INTERLEAVED_THINKING) &&
      oQ() === "bedrock" &&
      [fU.bedrock, KV.bedrock].includes(requestContext.model)
    ) {
      interleavedThinking = buildAnthropicConfigWithExtraBody([E61]);
    } else {
      interleavedThinking = buildAnthropicConfigWithExtraBody();
    }
    const thinkingConfig =
      maxOutputTokens > 0
        ? {
            budget_tokens: budgetTokens,
            type: "enabled"
          }
        : undefined;
    const maxTokens =
      requestContext?.maxTokensOverride ||
      options.maxOutputTokensOverride ||
      Math.max(maxOutputTokens + 1, Wt1(options.model));
    return {
      model: options.model,
      messages: hZ5(filteredUserMessages),
      temperature,
      system: formattedSystemPrompts,
      tools: [...toolSchemas, ...(options.extraToolSchemas ?? [])],
      tool_choice: options.toolChoice,
      ...(hasBetaFlags ? { betas: betaFlags } : {}),
      metadata: A11(),
      max_tokens: maxTokens,
      thinking: thinkingConfig,
      ...interleavedThinking
    };
  };

  try {
    // Attempt streaming response
    streamingResponse = await retryWithTokenRefreshAndContextAdjustment(
      () =>
        NK({
          maxRetries: 0,
          model: options.model,
          isNonInteractiveSession: options.isNonInteractiveSession
        }),
      async (streamApi, currentAttempt, requestContext) => {
        attemptCount = currentAttempt;
        streamStartTime = Date.now();
        const requestPayload = buildModelRequestPayload(requestContext);
        maxTokensUsed = requestPayload.max_tokens;
        return streamApi.beta.messages.stream(requestPayload, {
          signal: abortSignal
        });
      },
      {
        showErrors: !options.isNonInteractiveSession,
        model: options.model
      }
    );
    // Reset state for streaming
    streamedMessages.length = 0;
    firstChunkLatencyMs = 0;
    messageEnvelope = undefined;
    toolContentBlocks.length = 0;
    tokenUsageStats = od;

    try {
      let isFirstChunk = true;
      for await (const streamEvent of streamingResponse) {
        if (isFirstChunk) {
          EQ("Stream started - received first chunk");
          isFirstChunk = false;
        }
        switch (streamEvent.type) {
          case "message_start":
            messageEnvelope = streamEvent.message;
            firstChunkLatencyMs = Date.now() - streamStartTime;
            tokenUsageStats = mergeTokenUsageStats(tokenUsageStats, streamEvent.message.usage);
            break;
          case "content_block_start":
            // Initialize content block for tool use, text, or thinking
            switch (streamEvent.content_block.type) {
              case "tool_use":
                toolContentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block,
                  input: ""
                };
                break;
              case "text":
                toolContentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block,
                  text: ""
                };
                break;
              case "thinking":
                toolContentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block,
                  thinking: ""
                };
                break;
              default:
                toolContentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block
                };
                break;
            }
            break;
          case "content_block_delta": {
            // Update content block with deltas
            const contentBlock = toolContentBlocks[streamEvent.index];
            if (!contentBlock) throw new RangeError("Content block not found");
            switch (streamEvent.delta.type) {
              case "citations_delta":
                break; // No action needed
              case "input_json_delta":
                if (contentBlock.type !== "tool_use")
                  throw new Error("Content block is not a input_json block");
                if (typeof contentBlock.input !== "string")
                  throw new Error("Content block input is not a string");
                contentBlock.input += streamEvent.delta.partial_json;
                break;
              case "text_delta":
                if (contentBlock.type !== "text")
                  throw new Error("Content block is not a text block");
                contentBlock.text += streamEvent.delta.text;
                break;
              case "signature_delta":
                if (contentBlock.type !== "thinking")
                  throw new Error("Content block is not a thinking block");
                contentBlock.signature = streamEvent.delta.signature;
                break;
              case "thinking_delta":
                if (contentBlock.type !== "thinking")
                  throw new Error("Content block is not a thinking block");
                contentBlock.thinking += streamEvent.delta.thinking;
                break;
            }
            break;
          }
          case "content_block_stop": {
            // Finalize content block and yield message
            const contentBlock = toolContentBlocks[streamEvent.index];
            if (!contentBlock) throw new RangeError("Content block not found");
            if (!messageEnvelope) throw new Error("Message not found");
            const normalizedMessage = normalizeToolInputsInMessageContent(
              {
                message: {
                  ...messageEnvelope,
                  content: ie([contentBlock])
                },
                requestId: streamingResponse.request_id ?? undefined,
                type: "assistant",
                uuid: Dt1(),
                timestamp: new Date().toISOString()
              },
              toolDefinitions
            );
            streamedMessages.push(normalizedMessage);
            yield normalizedMessage;
            break;
          }
          case "message_delta": {
            // Update usage stats and handle stop reason
            tokenUsageStats = mergeTokenUsageStats(tokenUsageStats, streamEvent.usage);
            stopReason = streamEvent.delta.stop_reason;
            const stopEvent = handleRefusalResponse(streamEvent.delta.stop_reason);
            if (stopEvent) yield stopEvent;
            if (stopReason === "max_tokens") {
              logTelemetryEventIfEnabled("tengu_max_tokens_reached", { max_tokens: maxTokensUsed });
              yield tY({
                content: `${_Z}: Claude'createInteractionAccessor response exceeded the ${maxTokensUsed} output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`
              });
            }
            break;
          }
          case "message_stop":
            // End of message
            break;
        }
        // Always yield stream event for consumers
        yield {
          type: "stream_event",
          event: streamEvent
        };
      }
      // Finalize after streaming
      const responseWithHeaders = (await streamingResponse.withResponse()).response;
      updateFallbackWarningThresholdFromHeaders(responseWithHeaders);
      isWhitespaceCharacterCode(responseWithHeaders.headers);
    } catch (streamingError) {
      // Handle streaming errors and fallback to non-streaming mode
      if (streamingError instanceof MI) {
        EQ(
          `Streaming aborted: ${
            streamingError instanceof Error
              ? streamingError.message
              : String(streamingError)
          }`
        );
        throw streamingError;
      }
      HG(
        `Error streaming, falling back to non-streaming mode: ${
          streamingError instanceof Error
            ? streamingError.message
            : String(streamingError)
        }`
      );
      didFallBackToNonStreaming = true;
      // Fallback: get full response in non-streaming mode
      const nonStreamingResponse = await retryWithTokenRefreshAndContextAdjustment(
        () =>
          NK({
            maxRetries: 0,
            model: options.model,
            isNonInteractiveSession: options.isNonInteractiveSession
          }),
        async (api, currentAttempt, requestContext) => {
          attemptCount = currentAttempt;
          const requestPayload = buildModelRequestPayload(requestContext);
          maxTokensUsed = requestPayload.max_tokens;
          return await api.beta.messages.create({
            ...requestPayload,
            max_tokens: Math.min(requestPayload.max_tokens, dZ5)
          });
        },
        {
          showErrors: !options.isNonInteractiveSession,
          model: options.model
        }
      );
      const normalizedMessage = normalizeToolInputsInMessageContent(
        {
          message: {
            ...nonStreamingResponse,
            content: ie(nonStreamingResponse.content)
          },
          requestId: streamingResponse.request_id ?? undefined,
          type: "assistant",
          uuid: Dt1(),
          timestamp: new Date().toISOString()
        },
        toolDefinitions
      );
      streamedMessages.push(normalizedMessage);
      yield normalizedMessage;
    }
  } catch (error) {
    // Handle errors in non-streaming fallback
    HG(
      `Error in non-streaming fallback: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    let apiError = error;
    let modelName = options.model;
    if (error instanceof TO) {
      apiError = error.originalError;
      modelName = error.retryContext.model;
    }
    if (apiError instanceof g6) handleRateLimitError(apiError);
    logApiErrorEvent({
      error: apiError,
      model: modelName,
      messageCount: filteredUserMessages.length,
      messageTokens: findAndProcessLastValidInteraction(filteredUserMessages),
      durationMs: Date.now() - streamStartTime,
      durationMsIncludingRetries: Date.now() - startIncludingRetries,
      attempt: attemptCount,
      requestId: streamingResponse?.request_id,
      didFallBackToNonStreaming
    });
    yield handleAnthropicApiError(apiError, modelName, options.isNonInteractiveSession);
    return;
  }

  // Final analytics event for the completed request
  Gt1({
    model:
      streamedMessages[0]?.message.model ||
      messageEnvelope?.model ||
      options.model,
    usage: tokenUsageStats,
    start: streamStartTime,
    startIncludingRetries,
    attempt: attemptCount,
    messageCount: filteredUserMessages.length,
    messageTokens: findAndProcessLastValidInteraction(filteredUserMessages),
    requestId: streamingResponse?.request_id ?? null,
    stopReason,
    ttftMs: firstChunkLatencyMs,
    didFallBackToNonStreaming
  });
}

module.exports = streamAssistantResponseWithToolSupport;