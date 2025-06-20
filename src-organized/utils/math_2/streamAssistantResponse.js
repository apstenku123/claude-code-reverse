/**
 * Streams an assistant'createInteractionAccessor response, handling tool usage, streaming/non-streaming fallbacks, and error reporting.
 *
 * @async
 * @generator
 * @function streamAssistantResponse
 * @param {Object} userContext - Contextual information about the user/request (a)
 * @param {Array} userMessages - Array of user and system messages (createPropertyAccessor)
 * @param {number} maxOutputTokens - Maximum number of output tokens allowed (deepCloneWithCycleDetection)
 * @param {Array} toolInputEntries - Array of tool input entries (createObjectTracker)
 * @param {AbortSignal} abortSignal - Signal to abort streaming (extractNestedPropertyOrArray)
 * @param {Object} options - Additional options and configuration (zA)
 * @yields {Object} Streamed assistant response events and error objects
 * @returns {AsyncGenerator<Object>} Yields streamed response events, error objects, or tool usage blocks
 */
async function* streamAssistantResponse(userContext, userMessages, maxOutputTokens, toolInputEntries, abortSignal, options) {
  // Check if the "tengu-off-switch" is activated and the model is supported for this switch
  if (
    !R6() &&
    (await kb("tengu-off-switch", { activated: false })).activated &&
    isOpus40Observable(options.model)
  ) {
    logTelemetryEventIfEnabled("tengu_off_switch_query", {});
    yield handleAnthropicApiError(new Error(Xm), options.model, options.isNonInteractiveSession);
    return;
  }

  // Prepare tool schemas and betas
  const [toolSchemas, betasList] = await Promise.all([
    Promise.all(
      toolInputEntries.map(toolEntry =>
        buildToolMetadata(toolEntry, {
          getToolPermissionContext: options.getToolPermissionContext,
          tools: toolInputEntries
        })
      )
    ),
    TY(options.model)
  ]);

  // Optionally prepend CLI system prompt
  if (options.prependCLISysprompt) {
    reportSyspromptBlockSnippet(userMessages);
    userMessages = [$handleInputCharacterCode(), ...userMessages];
  }

  const systemPrompt = createTextMessageObjects(userMessages);
  const hasBetas = isPromptCachingEnabled() && betasList.length > 0;
  const temperature = options.temperature ?? fZ5;
  const processedMessages = DC(userContext);

  // Log request metadata
  Qt1({
    model: options.model,
    messagesLength: JSON.stringify([
      ...systemPrompt,
      ...processedMessages,
      ...toolSchemas,
      ...(options.extraToolSchemas ?? [])
    ]).length,
    temperature,
    betas: hasBetas ? betasList : [],
    permissionMode: options.getToolPermissionContext().mode
  });

  // Initialize streaming state
  const requestStartTime = Date.now();
  let streamStartTime = Date.now();
  let retryAttempt = 0;
  let streamResponse = undefined;
  let buildRequestPayload = (createRequestOptions) => {
    // Calculate max tokens for this request
    const maxTokens = createRequestOptions.maxTokensOverride
      ? Math.min(maxOutputTokens, createRequestOptions.maxTokensOverride - 1)
      : maxOutputTokens;

    // Optionally include 'thinking' budget
    let thinkingConfig;
    if (
      !isTruthyString(process.env.DISABLE_INTERLEAVED_THINKING) &&
      oQ() === "bedrock" &&
      [fU.bedrock, KV.bedrock].includes(createRequestOptions.model)
    ) {
      thinkingConfig = buildAnthropicConfigWithExtraBody([E61]);
    } else {
      thinkingConfig = buildAnthropicConfigWithExtraBody();
    }

    // Determine effective max tokens
    const effectiveMaxTokens =
      createRequestOptions?.maxTokensOverride ||
      options.maxOutputTokensOverride ||
      Math.max(maxOutputTokens + 1, Wt1(options.model));

    // Build the request payload
    return {
      model: options.model,
      messages: hZ5(processedMessages),
      temperature,
      system: systemPrompt,
      tools: [...toolSchemas, ...(options.extraToolSchemas ?? [])],
      tool_choice: options.toolChoice,
      ...(hasBetas ? { betas: betasList } : {}),
      metadata: A11(),
      max_tokens: effectiveMaxTokens,
      thinking: maxOutputTokens > 0
        ? { budget_tokens: maxTokens, type: "enabled" }
        : undefined,
      ...thinkingConfig
    };
  };

  // Streaming state variables
  const streamedMessages = [];
  let timeToFirstTokenMs = 0;
  let currentMessage = undefined;
  let contentBlocks = [];
  let totalUsage = od;
  let stopReason = null;
  let didFallBackToNonStreaming = false;
  let lastMaxTokens = 0;

  try {
    // Attempt streaming mode
    streamResponse = await retryWithTokenRefreshAndContextAdjustment(
      () => NK({
        maxRetries: 0,
        model: options.model,
        isNonInteractiveSession: options.isNonInteractiveSession
      }),
      async (streamApi, attempt, createRequestOptions) => {
        retryAttempt = attempt;
        streamStartTime = Date.now();
        const requestPayload = buildRequestPayload(createRequestOptions);
        lastMaxTokens = requestPayload.max_tokens;
        return streamApi.beta.messages.stream(requestPayload, { signal: abortSignal });
      },
      {
        showErrors: !options.isNonInteractiveSession,
        model: options.model
      }
    );
    // Reset state for streaming
    streamedMessages.length = 0;
    timeToFirstTokenMs = 0;
    currentMessage = undefined;
    contentBlocks.length = 0;
    totalUsage = od;

    try {
      let isFirstChunk = true;
      for await (const streamEvent of streamResponse) {
        if (isFirstChunk) {
          EQ("Stream started - received first chunk");
          isFirstChunk = false;
        }
        switch (streamEvent.type) {
          case "message_start":
            currentMessage = streamEvent.message;
            timeToFirstTokenMs = Date.now() - streamStartTime;
            totalUsage = mergeTokenUsageStats(totalUsage, streamEvent.message.usage);
            break;
          case "content_block_start":
            // Initialize content block by type
            switch (streamEvent.content_block.type) {
              case "tool_use":
                contentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block,
                  input: ""
                };
                break;
              case "text":
                contentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block,
                  text: ""
                };
                break;
              case "thinking":
                contentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block,
                  thinking: ""
                };
                break;
              default:
                contentBlocks[streamEvent.index] = {
                  ...streamEvent.content_block
                };
                break;
            }
            break;
          case "content_block_delta": {
            // Update content block with delta
            const block = contentBlocks[streamEvent.index];
            if (!block) throw new RangeError("Content block not found");
            switch (streamEvent.delta.type) {
              case "citations_delta":
                // No-op for citations
                break;
              case "input_json_delta":
                if (block.type !== "tool_use") throw new Error("Content block is not a input_json block");
                if (typeof block.input !== "string") throw new Error("Content block input is not a string");
                block.input += streamEvent.delta.partial_json;
                break;
              case "text_delta":
                if (block.type !== "text") throw new Error("Content block is not a text block");
                block.text += streamEvent.delta.text;
                break;
              case "signature_delta":
                if (block.type !== "thinking") throw new Error("Content block is not a thinking block");
                block.signature = streamEvent.delta.signature;
                break;
              case "thinking_delta":
                if (block.type !== "thinking") throw new Error("Content block is not a thinking block");
                block.thinking += streamEvent.delta.thinking;
                break;
            }
            break;
          }
          case "content_block_stop": {
            // Finalize content block and yield message
            const block = contentBlocks[streamEvent.index];
            if (!block) throw new RangeError("Content block not found");
            if (!currentMessage) throw new Error("Message not found");
            const normalizedMessage = normalizeToolInputsInMessageContent(
              {
                message: {
                  ...currentMessage,
                  content: ie([block])
                },
                requestId: streamResponse.request_id ?? undefined,
                type: "assistant",
                uuid: Dt1(),
                timestamp: new Date().toISOString()
              },
              toolInputEntries
            );
            streamedMessages.push(normalizedMessage);
            yield normalizedMessage;
            break;
          }
          case "message_delta": {
            // Update usage and handle stop reasons
            totalUsage = mergeTokenUsageStats(totalUsage, streamEvent.usage);
            stopReason = streamEvent.delta.stop_reason;
            const stopEvent = handleRefusalResponse(streamEvent.delta.stop_reason);
            if (stopEvent) yield stopEvent;
            if (stopReason === "max_tokens") {
              logTelemetryEventIfEnabled("tengu_max_tokens_reached", { max_tokens: lastMaxTokens });
              yield tY({
                content: `${_Z}: Claude'createInteractionAccessor response exceeded the ${lastMaxTokens} output token maximum. To configure this behavior, set the CLAUDE_CODE_MAX_OUTPUT_TOKENS environment variable.`
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
      // Handle response headers and analytics after streaming
      const responseWithHeaders = (await streamResponse.withResponse()).response;
      updateFallbackWarningThresholdFromHeaders(responseWithHeaders);
      isWhitespaceCharacterCode(responseWithHeaders.headers);
    } catch (streamError) {
      // Handle streaming errors and fall back to non-streaming mode
      if (streamError instanceof MI) {
        EQ(`Streaming aborted: ${streamError instanceof Error ? streamError.message : String(streamError)}`);
        throw streamError;
      }
      HG(
        `Error streaming, falling back to non-streaming mode: ${streamError instanceof Error ? streamError.message : String(streamError)}`
      );
      didFallBackToNonStreaming = true;
      // Fallback: non-streaming mode
      const fallbackResponse = await retryWithTokenRefreshAndContextAdjustment(
        () => NK({
          maxRetries: 0,
          model: options.model,
          isNonInteractiveSession: options.isNonInteractiveSession
        }),
        async (api, attempt, createRequestOptions) => {
          retryAttempt = attempt;
          const fallbackPayload = buildRequestPayload(createRequestOptions);
          lastMaxTokens = fallbackPayload.max_tokens;
          return await api.beta.messages.create({
            ...fallbackPayload,
            max_tokens: Math.min(fallbackPayload.max_tokens, dZ5)
          });
        },
        {
          showErrors: !options.isNonInteractiveSession,
          model: options.model
        }
      );
      const normalizedFallback = normalizeToolInputsInMessageContent(
        {
          message: {
            ...fallbackResponse,
            content: ie(fallbackResponse.content)
          },
          requestId: streamResponse.request_id ?? undefined,
          type: "assistant",
          uuid: Dt1(),
          timestamp: new Date().toISOString()
        },
        toolInputEntries
      );
      streamedMessages.push(normalizedFallback);
      yield normalizedFallback;
    }
  } catch (mainError) {
    // Handle errors in non-streaming fallback
    HG(
      `Error in non-streaming fallback: ${mainError instanceof Error ? mainError.message : String(mainError)}`
    );
    let errorToReport = mainError;
    let modelForError = options.model;
    if (mainError instanceof TO) {
      errorToReport = mainError.originalError;
      modelForError = mainError.retryContext.model;
    }
    if (errorToReport instanceof g6) {
      handleRateLimitError(errorToReport);
    }
    logApiErrorEvent({
      error: errorToReport,
      model: modelForError,
      messageCount: processedMessages.length,
      messageTokens: findAndProcessLastValidInteraction(processedMessages),
      durationMs: Date.now() - streamStartTime,
      durationMsIncludingRetries: Date.now() - requestStartTime,
      attempt: retryAttempt,
      requestId: streamResponse?.request_id,
      didFallBackToNonStreaming
    });
    yield handleAnthropicApiError(errorToReport, modelForError, options.isNonInteractiveSession);
    return;
  }

  // Log analytics and monitoring for successful completion
  Gt1({
    model: streamedMessages[0]?.message.model ?? currentMessage?.model ?? options.model,
    usage: totalUsage,
    start: streamStartTime,
    startIncludingRetries: requestStartTime,
    attempt: retryAttempt,
    messageCount: processedMessages.length,
    messageTokens: findAndProcessLastValidInteraction(processedMessages),
    requestId: streamResponse?.request_id ?? null,
    stopReason,
    ttftMs: timeToFirstTokenMs,
    didFallBackToNonStreaming
  });
}

module.exports = streamAssistantResponse;