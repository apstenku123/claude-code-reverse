/**
 * Processes an assistant message stream, handling message compaction, tool usage, error handling, and queued commands.
 * Yields events as they occur in the assistant'createInteractionAccessor main loop, including tool use and system messages.
 *
 * @async
 * @generator
 * @param {Array<Object>} messageHistory - The array of message objects representing the conversation history.
 * @param {Object} config - Configuration object for the assistant session.
 * @param {Object} subscription - Subscription or context object for message processing.
 * @param {Object} inputEntries - Aggregated input entries for the session.
 * @param {Object} toolHandlers - Handlers and configuration for tool usage.
 * @param {Object} sessionContext - Session context, including options, tools, abort controller, etc.
 * @param {Object} compactionState - State object tracking message compaction and turn counters.
 * @yields {Object} Streamed assistant or system events as they occur.
 * @returns {AsyncGenerator<Object>} Yields assistant, tool, and system events as they are processed.
 */
async function* processAssistantStreamWithCompactionAndTools(
  messageHistory,
  config,
  subscription,
  inputEntries,
  toolHandlers,
  sessionContext,
  compactionState
) {
  // Notify that the stream request is starting
  yield { type: "stream_request_start" };

  let currentMessages = messageHistory;
  let currentCompactionState = compactionState;

  // Attempt to compact messages if needed
  const {
    messages: possiblyCompactedMessages,
    wasCompacted
  } = await compactMessagesIfNeeded(messageHistory, sessionContext);

  if (wasCompacted) {
    // Log compaction event
    logEvent("tengu_auto_compact_succeeded", {
      originalMessageCount: messageHistory.length,
      compactedMessageCount: possiblyCompactedMessages.length
    });
    // If compaction state is not set, initialize isBlobOrFileLikeObject
    if (!currentCompactionState?.compacted) {
      currentCompactionState = {
        compacted: true,
        turnId: generateTurnId(),
        turnCounter: 0
      };
    }
    currentMessages = possiblyCompactedMessages;
  }

  const assistantResponses = [];
  try {
    // Main assistant loop: process messages and yield events
    for await (const event of streamAssistantResponseWithObservable(
      mapInteractionEntriesToRouteNames(currentMessages, subscription),
      appendConfigEntriesToArray(config, inputEntries),
      sessionContext.options.maxThinkingTokens,
      sessionContext.options.tools,
      sessionContext.abortController.signal,
      {
        getToolPermissionContext: sessionContext.getToolPermissionContext,
        model: sessionContext.options.mainLoopModel,
        prependCLISysprompt: true,
        toolChoice: undefined,
        isNonInteractiveSession: sessionContext.options.isNonInteractiveSession
      }
    )) {
      yield event;
      if (event.type === "assistant") {
        assistantResponses.push(event);
      }
    }
  } catch (error) {
    // Handle errors during assistant processing
    logError(error instanceof Error ? error : new Error(String(error)));
    yield generateResponseContent({ toolUse: false, hardcodedMessage: undefined });
    return;
  }

  if (!assistantResponses.length) return;

  // Extract all tool_use messages from assistant responses
  const toolUseMessages = assistantResponses.flatMap(response =>
    response.message.content.filter(contentItem => contentItem.type === "tool_use")
  );
  if (!toolUseMessages.length) return;

  const userMessagesFromTools = [];
  // Process tool use blocks and yield their results
  for await (const toolEvent of processBlocksWithConcurrencySafety(
    toolUseMessages,
    assistantResponses,
    toolHandlers,
    sessionContext
  )) {
    yield toolEvent;
    // Collect user messages from tool processing
    userMessagesFromTools.push(
      ...filterAndMergeSecurityEvents([toolEvent]).filter(e => e.type === "user")
    );
  }

  // If the session was aborted during tool processing, yield a system message and exit
  if (sessionContext.abortController.signal.aborted) {
    yield generateResponseContent({ toolUse: true, hardcodedMessage: undefined });
    return;
  }

  // Sort user messages to match the order of their corresponding tool_use messages
  const sortedUserMessages = userMessagesFromTools.sort((userA, userB) => {
    const indexA = toolUseMessages.findIndex(toolMsg =>
      toolMsg.id === (userA.type === "user" && userA.message.content[0].id)
    );
    const indexB = toolUseMessages.findIndex(toolMsg =>
      toolMsg.id === (userB.type === "user" && userB.message.content[0].id)
    );
    return indexA - indexB;
  });

  // If compaction occurred, increment turn counter and log event
  if (currentCompactionState?.compacted) {
    currentCompactionState.turnCounter++;
    logEvent("tengu_post_autocompact_turn", {
      turnId: currentCompactionState.turnId,
      turnCounter: currentCompactionState.turnCounter
    });
  }

  // Process queued commands
  const queuedCommands = [...sessionContext.getQueuedCommands()];
  for await (const queuedEvent of qK1(null, sessionContext, null, queuedCommands)) {
    yield queuedEvent;
    userMessagesFromTools.push(queuedEvent);
  }
  sessionContext.removeQueuedCommands(queuedCommands);

  // If fallback model is needed, update session context and notify
  const updatedSessionContext = pT()
    ? {
        ...sessionContext,
        options: {
          ...sessionContext.options,
          mainLoopModel: getFallbackModel()
        }
      }
    : sessionContext;

  if (pT() && getFallbackModel() !== sessionContext.options.mainLoopModel) {
    logEvent("tengu_fallback_system_msg", {
      mainLoopModel: sessionContext.options.mainLoopModel,
      fallbackModel: getFallbackModel()
    });
    yield createSystemMessage(
      `Claude Opus 4 limit reached, now using ${formatModelName(getFallbackModel())}`
    );
  }

  // Recursively continue the assistant loop with updated messages and context
  yield* processAssistantStreamWithCompactionAndTools(
    [...currentMessages, ...assistantResponses, ...sortedUserMessages],
    config,
    subscription,
    inputEntries,
    toolHandlers,
    updatedSessionContext,
    currentCompactionState
  );
}

module.exports = processAssistantStreamWithCompactionAndTools;