/**
 * Processes a stream of messages, optionally compacts them, handles tool use, manages user turns, and yields results step-by-step.
 * This function orchestrates the main loop for handling assistant/user/tool interactions, including compaction, tool invocation, and fallback model switching.
 *
 * @async
 * @generator
 * @param {Array<Object>} interactionEntries - The initial array of interaction entries/messages.
 * @param {Object} config - Configuration object for the stream process.
 * @param {Object} subscription - Subscription or context object for the stream.
 * @param {Object} inputConfig - Input configuration for the stream.
 * @param {Object} toolHandler - Handler or context for tool use.
 * @param {Object} sessionContext - Session context, including options and abort controller.
 * @param {Object} recentInputState - State object for recent input entries, including compaction info.
 * @yields {Object} - Yields various stream events and responses as they are processed.
 */
async function* processStreamWithCompactionAndToolUse(
  interactionEntries,
  config,
  subscription,
  inputConfig,
  toolHandler,
  sessionContext,
  recentInputState
) {
  // Notify that the stream request has started
  yield { type: "stream_request_start" };

  let currentMessages = interactionEntries;
  let currentRecentInputState = recentInputState;

  // Attempt to compact messages if needed
  const {
    messages: compactedMessages,
    wasCompacted
  } = await compactMessagesIfNeeded(interactionEntries, sessionContext);

  if (wasCompacted) {
    // Log compaction event
    logTelemetryEventIfEnabled("tengu_auto_compact_succeeded", {
      originalMessageCount: interactionEntries.length,
      compactedMessageCount: compactedMessages.length
    });
    // If not already marked as compacted, update state
    if (!currentRecentInputState?.compacted) {
      currentRecentInputState = {
        compacted: true,
        turnId: jD5(),
        turnCounter: 0
      };
    }
    currentMessages = compactedMessages;
  }

  const assistantResponses = [];
  try {
    // Main assistant loop: process messages and yield responses
    for await (const response of streamAssistantResponseWithObservable(
      prependSystemReminderIfContextExists(currentMessages, subscription),
      appendConfigEntriesToArray(config, inputConfig),
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
      yield response;
      if (response.type === "assistant") {
        assistantResponses.push(response);
      }
    }
  } catch (error) {
    // Handle errors and yield a default message response
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    yield generateDefaultMessageResponse({
      toolUse: false,
      hardcodedMessage: undefined
    });
    return;
  }

  if (!assistantResponses.length) return;

  // Extract all tool_use messages from assistant responses
  const toolUseMessages = assistantResponses.flatMap(assistantResponse =>
    assistantResponse.message.content.filter(contentItem => contentItem.type === "tool_use")
  );
  if (!toolUseMessages.length) return;

  // Process tool use messages and collect user responses
  const userResponses = [];
  for await (const toolResult of yD5(toolUseMessages, assistantResponses, toolHandler, sessionContext)) {
    yield toolResult;
    userResponses.push(
      ...DC([toolResult]).filter(contentItem => contentItem.type === "user")
    );
  }

  // If the session was aborted during tool use, yield a tool use message and exit
  if (sessionContext.abortController.signal.aborted) {
    yield generateDefaultMessageResponse({
      toolUse: true,
      hardcodedMessage: undefined
    });
    return;
  }

  // Sort user responses to match the order of tool use messages
  const sortedUserResponses = userResponses.sort((userA, userB) => {
    const indexA = toolUseMessages.findIndex(toolMsg =>
      toolMsg.id === (userA.type === "user" && userA.message.content[0].id)
    );
    const indexB = toolUseMessages.findIndex(toolMsg =>
      toolMsg.id === (userB.type === "user" && userB.message.content[0].id)
    );
    return indexA - indexB;
  });

  // If compaction occurred, increment the turn counter and log the event
  if (currentRecentInputState?.compacted) {
    currentRecentInputState.turnCounter++;
    logTelemetryEventIfEnabled("tengu_post_autocompact_turn", {
      turnId: currentRecentInputState.turnId,
      turnCounter: currentRecentInputState.turnCounter
    });
  }

  // Handle queued commands
  const queuedCommands = [...sessionContext.getQueuedCommands()];
  for await (const queuedCommand of qK1(null, sessionContext, null, queuedCommands)) {
    yield queuedCommand;
    userResponses.push(queuedCommand);
  }
  sessionContext.removeQueuedCommands(queuedCommands);

  // If a fallback model is needed, update the session context accordingly
  const updatedSessionContext = pT()
    ? {
        ...sessionContext,
        options: {
          ...sessionContext.options,
          mainLoopModel: JX()
        }
      }
    : sessionContext;

  // If fallback model is used, log and notify user
  if (pT() && JX() !== sessionContext.options.mainLoopModel) {
    logTelemetryEventIfEnabled("tengu_fallback_system_msg", {
      mainLoopModel: sessionContext.options.mainLoopModel,
      fallbackModel: JX()
    });
    yield createSystemMessage(
      `Claude Opus 4 limit reached, now using ${getOpusOrSonnetLabel(JX())}`
    );
  }

  // Recursively continue the process with updated messages and context
  yield* processStreamWithCompactionAndToolUse(
    [...currentMessages, ...assistantResponses, ...sortedUserResponses],
    config,
    subscription,
    inputConfig,
    toolHandler,
    updatedSessionContext,
    currentRecentInputState
  );
}

module.exports = processStreamWithCompactionAndToolUse;