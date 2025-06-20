/**
 * Processes agent and user messages, yielding progress and results as the agent interacts with tools and generates responses.
 *
 * @async
 * @generator
 * @param {string} initialUserMessage - The initial user message content.
 * @param {number} agentIndex - The index of the agent (for multi-agent scenarios).
 * @param {object} agentContext - Context object containing abortController, options, tool permissions, file state, etc.
 * @param {object} interactionInfo - Information about the current interaction (e.g., message IDs).
 * @param {object} toolSet - Set of tools available to the agent.
 * @param {object} [agentOptions={}] - Optional overrides (e.g., isSynthesis, systemPrompt, model).
 * @yields {object} Progress and result objects as the agent processes messages.
 * @throws {Error} If the last message is not from the assistant or if a tool error occurs.
 */
async function* agentMessageProcessor(
  initialUserMessage,
  agentIndex,
  agentContext,
  interactionInfo,
  toolSet,
  agentOptions = {}
) {
  // Destructure agent context
  const {
    abortController,
    options: {
      debug: isDebugMode,
      verbose: isVerbose,
      isNonInteractiveSession
    },
    getToolPermissionContext,
    readFileState,
    setInProgressToolUseIDs,
    tools
  } = agentContext;

  // Destructure agent options
  const {
    isSynthesis = false,
    systemPrompt,
    model
  } = agentOptions;

  // Generate a unique agent updateSnapshotAndNotify
  const agentId = tw5();

  // Prepare the initial message array
  const initialMessages = [createUserMessageObject({ content: initialUserMessage })];

  // Await required dependencies in parallel
  const [toolWrapper, environment, modelToUse] = await Promise.all([
    UW(),
    WE(isNonInteractiveSession ?? false),
    model ?? getProcessedInteractionRoute()
  ]);

  // Determine the system prompt to use
  const systemPromptToUse = await (systemPrompt ?? Mn0(modelToUse));

  // Store all processed messages
  const processedMessages = [];
  let toolUseCount = 0;

  // Main message processing loop
  for await (const messageEvent of processStreamWithCompactionAndToolUse(initialMessages, systemPromptToUse, toolWrapper, environment, toolSet, {
    abortController,
    options: {
      isNonInteractiveSession: isNonInteractiveSession ?? false,
      tools,
      commands: [],
      debug: isDebugMode,
      verbose: isVerbose,
      mainLoopModel: modelToUse,
      maxThinkingTokens: Kk(initialMessages),
      mcpClients: [],
      mcpResources: {}
    },
    getToolPermissionContext,
    readFileState,
    getQueuedCommands: () => [],
    removeQueuedCommands: () => {},
    setInProgressToolUseIDs,
    agentId
  })) {
    // Only process assistant, user, or progress messages
    if (
      messageEvent.type !== "assistant" &&
      messageEvent.type !== "user" &&
      messageEvent.type !== "progress"
    ) {
      continue;
    }

    processedMessages.push(messageEvent);

    // Only yield progress for assistant or user messages
    if (messageEvent.type !== "assistant" && messageEvent.type !== "user") {
      continue;
    }

    // Normalize all messages so far
    const normalizedMessages = s3(processedMessages);
    // Normalize the current message event (may be multi-content)
    for (const normalizedEvent of s3([messageEvent])) {
      for (const contentItem of normalizedEvent.message.content) {
        // Only process tool_use and tool_result content
        if (contentItem.type !== "tool_use" && contentItem.type !== "tool_result") {
          continue;
        }
        // Increment tool use count if applicable
        if (contentItem.type === "tool_use") {
          toolUseCount++;
        }
        // Yield progress update
        yield {
          type: "progress",
          toolUseID: isSynthesis
            ? `synthesis_${interactionInfo.message.id}`
            : `agent_${agentIndex}_${interactionInfo.message.id}`,
          data: {
            message: normalizedEvent,
            normalizedMessages,
            type: "agent_progress"
          }
        };
      }
    }
  }

  // Get the last processed message
  const lastMessage = CD(processedMessages);

  // If the last message is an error, throw
  if (lastMessage && isTextMessageWithKnownContent(lastMessage)) {
    throw new KG();
  }

  // Ensure the last message is from the assistant
  if (lastMessage?.type !== "assistant") {
    throw new Error(
      isSynthesis
        ? "Synthesis: Last message was not an assistant message"
        : `Agent ${agentIndex + 1}: Last message was not an assistant message`
    );
  }

  // Calculate total tokens used
  const totalTokens =
    (lastMessage.message.usage.cache_creation_input_tokens ?? 0) +
    (lastMessage.message.usage.cache_read_input_tokens ?? 0) +
    lastMessage.message.usage.input_tokens +
    lastMessage.message.usage.output_tokens;

  // Extract only text content from the last message
  const textContents = lastMessage.message.content.filter(
    contentItem => contentItem.type === "text"
  );

  // Finalize message state
  _B0([...initialMessages, ...processedMessages]);

  // Yield the final result
  yield {
    type: "result",
    data: {
      agentIndex,
      content: textContents,
      toolUseCount,
      tokens: totalTokens,
      usage: lastMessage.message.usage
    }
  };
}

module.exports = agentMessageProcessor;
