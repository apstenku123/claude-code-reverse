/**
 * Processes a streamed user-assistant interaction, including message compaction, tool use handling, and queued command execution.
 * 
 * @async
 * @generator
 * @param {Array<Object>} userMessages - The array of user message objects to process.
 * @param {Object} assistantConfig - Configuration object for the assistant.
 * @param {Object} subscription - Subscription or context object for the session.
 * @param {Object} interactionInfo - Information about the current interaction/session.
 * @param {Object} concurrencyGuard - Concurrency guard or processor for tool use blocks.
 * @param {Object} sessionOptions - Session options and utilities (includes abortController, options, tools, etc).
 * @param {Object} inputAggregationState - State object for tracking input aggregation and compaction.
 * @yields {Object} Streamed events and responses as they are processed.
 * @returns {AsyncGenerator<Object>} Yields streamed events and responses.
 */
async function* processStreamedUserAssistantInteraction(
  userMessages,
  assistantConfig,
  subscription,
  interactionInfo,
  concurrencyGuard,
  sessionOptions,
  inputAggregationState
) {
  // Notify that the stream request has started
  yield { type: "stream_request_start" };

  let currentMessages = userMessages;
  let compactionState = inputAggregationState;

  // Attempt to compact messages if needed
  const {
    messages: possiblyCompactedMessages,
    wasCompacted
  } = await compactMessagesIfNeeded(userMessages, sessionOptions);

  if (wasCompacted) {
    // Log compaction event
    logEvent("tengu_auto_compact_succeeded", {
      originalMessageCount: userMessages.length,
      compactedMessageCount: possiblyCompactedMessages.length
    });
    // If compaction state is not set, initialize isBlobOrFileLikeObject
    if (!compactionState?.compacted) {
      compactionState = {
        compacted: true,
        turnId: generateTurnId(),
        turnCounter: 0
      };
    }
    currentMessages = possiblyCompactedMessages;
  }

  const assistantResponses = [];
  try {
    // Stream assistant responses
    for await (const response of streamAssistantResponseWithObservable(
      prependSystemReminderIfContextExists(currentMessages, subscription),
      appendConfigEntriesToArray(assistantConfig, interactionInfo),
      sessionOptions.options.maxThinkingTokens,
      sessionOptions.options.tools,
      sessionOptions.abortController.signal,
      {
        getToolPermissionContext: sessionOptions.getToolPermissionContext,
        model: sessionOptions.options.mainLoopModel,
        prependCLISysprompt: true,
        toolChoice: undefined,
        isNonInteractiveSession: sessionOptions.options.isNonInteractiveSession
      }
    )) {
      yield response;
      if (response.type === "assistant") {
        assistantResponses.push(response);
      }
    }
  } catch (error) {
    // Handle errors during assistant response streaming
    logError(error instanceof Error ? error : new Error(String(error)));
    yield generateDefaultMessageResponse({
      toolUse: false,
      hardcodedMessage: undefined
    });
    return;
  }

  if (!assistantResponses.length) return;

  // Extract all tool use blocks from assistant responses
  const toolUseBlocks = assistantResponses.flatMap(response =>
    response.message.content.filter(contentItem => contentItem.type === "tool_use")
  );
  if (!toolUseBlocks.length) return;

  let userToolResponses = [];
  // Process tool use blocks and collect user responses
  for await (const toolResponse of processBlocksWithConcurrencySafety(
    toolUseBlocks,
    assistantResponses,
    concurrencyGuard,
    sessionOptions
  )) {
    yield toolResponse;
    userToolResponses.push(
      ...mergeAndFilterActivities([toolResponse]).filter(
        activity => activity.type === "user"
      )
    );
  }

  // If the session was aborted during tool use processing, yield a default message and exit
  if (sessionOptions.abortController.signal.aborted) {
    yield generateDefaultMessageResponse({
      toolUse: true,
      hardcodedMessage: undefined
    });
    return;
  }

  // Sort user tool responses to match the order of tool use blocks
  const sortedUserToolResponses = userToolResponses.sort((userA, userB) => {
    const indexA = toolUseBlocks.findIndex(
      block => block.id === (userA.type === "user" && userA.message.content[0].id)
    );
    const indexB = toolUseBlocks.findIndex(
      block => block.id === (userB.type === "user" && userB.message.content[0].id)
    );
    return indexA - indexB;
  });

  // If compaction occurred, increment turn counter and log event
  if (compactionState?.compacted) {
    compactionState.turnCounter++;
    logEvent("tengu_post_autocompact_turn", {
      turnId: compactionState.turnId,
      turnCounter: compactionState.turnCounter
    });
  }

  // Process any queued commands
  const queuedCommands = [...sessionOptions.getQueuedCommands()];
  for await (const command of processAndYieldAttachments(
    null,
    sessionOptions,
    null,
    queuedCommands
  )) {
    yield command;
    userToolResponses.push(command);
  }
  sessionOptions.removeQueuedCommands(queuedCommands);

  // If fallback model is needed, update session options and notify
  const updatedSessionOptions = isFallbackModelRequired()
    ? {
        ...sessionOptions,
        options: {
          ...sessionOptions.options,
          mainLoopModel: getEB0Value()
        }
      }
    : sessionOptions;

  if (
    isFallbackModelRequired() &&
    getEB0Value() !== sessionOptions.options.mainLoopModel
  ) {
    logEvent("tengu_fallback_system_msg", {
      mainLoopModel: sessionOptions.options.mainLoopModel,
      fallbackModel: getEB0Value()
    });
    yield createSystemMessage(
      `Claude Opus 4 limit reached, now using ${formatModelName(getEB0Value())}`
    );
  }

  // Recursively process the next turn with updated messages and state
  yield* processStreamedUserAssistantInteraction(
    [...currentMessages, ...assistantResponses, ...sortedUserToolResponses],
    assistantConfig,
    subscription,
    interactionInfo,
    concurrencyGuard,
    updatedSessionOptions,
    compactionState
  );
}

module.exports = processStreamedUserAssistantInteraction;