/**
 * Processes a stream of agent/user messages, handles tool usage, and yields progress/results.
 * 
 * @async
 * @generator
 * @param {string} initialUserMessage - The initial user message content.
 * @param {number} agentIndex - The index of the agent (for multi-agent scenarios).
 * @param {object} agentContext - Context object containing abortController, options, tool context, etc.
 * @param {object} agentMessage - The agent'createInteractionAccessor message object (with .message.id, etc.).
 * @param {object} toolConfig - Configuration for available tools.
 * @param {object} [agentOptions={}] - Optional overrides: isSynthesis, systemPrompt, model, etc.
 * @yields {object} Progress or result objects as the agent processes messages.
 * @throws {Error} If the last message is not an assistant message or if tool error is detected.
 */
async function* runAgentMessageProcessingLoop(
  initialUserMessage,
  agentIndex,
  agentContext,
  agentMessage,
  toolConfig,
  agentOptions = {}
) {
  // Destructure agentContext for required properties
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
    tools: availableTools
  } = agentContext;

  // Destructure agentOptions for overrides
  const {
    isSynthesis = false,
    systemPrompt,
    model: modelOverride
  } = agentOptions;

  // Generate a unique agent updateSnapshotAndNotify for this run
  const agentId = tw5();

  // Prepare the initial message chain
  const initialMessages = [createUserMessageObject({ content: initialUserMessage })];

  // Prepare model and tool environment
  const [toolWrapper, toolEnv, model] = await Promise.all([
    UW(),
    WE(isNonInteractiveSession ?? false),
    modelOverride ?? getProcessedInteractionRoute()
  ]);

  // Get the system prompt (either from options or by default for the model)
  const resolvedSystemPrompt = await (systemPrompt ?? Mn0(model));

  // Store all processed messages
  const processedMessages = [];
  // Track number of tool uses
  let toolUseCount = 0;

  // Main message processing loop
  for await (const messageEvent of processStreamWithCompactionAndToolUse(
    initialMessages,
    resolvedSystemPrompt,
    toolWrapper,
    toolEnv,
    toolConfig,
    {
      abortController,
      options: {
        isNonInteractiveSession: isNonInteractiveSession ?? false,
        tools: availableTools,
        commands: [],
        debug: isDebugMode,
        verbose: isVerbose,
        mainLoopModel: model,
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
    }
  )) {
    // Only process assistant/user/progress messages
    if (
      messageEvent.type !== "assistant" &&
      messageEvent.type !== "user" &&
      messageEvent.type !== "progress"
    ) {
      continue;
    }

    // Add to processed messages
    processedMessages.push(messageEvent);

    // Only process assistant/user messages for tool usage
    if (messageEvent.type !== "assistant" && messageEvent.type !== "user") {
      continue;
    }

    // Normalize the message chain up to this point
    const normalizedMessages = s3(processedMessages);
    // Normalize the current message (may be multi-content)
    for (const normalizedMessage of s3([messageEvent])) {
      for (const messageContent of normalizedMessage.message.content) {
        // Only handle tool_use or tool_result content
        if (
          messageContent.type !== "tool_use" &&
          messageContent.type !== "tool_result"
        ) {
          continue;
        }
        // Count tool uses
        if (messageContent.type === "tool_use") {
          toolUseCount++;
        }
        // Yield progress update
        yield {
          type: "progress",
          toolUseID: isSynthesis
            ? `synthesis_${agentMessage.message.id}`
            : `agent_${agentIndex}_${agentMessage.message.id}`,
          data: {
            message: normalizedMessage,
            normalizedMessages,
            type: "agent_progress"
          }
        };
      }
    }
  }

  // After loop: get the last assistant message
  const lastMessage = CD(processedMessages);

  // If tool error detected, throw
  if (lastMessage && isTextMessageWithKnownContent(lastMessage)) {
    throw new KG();
  }

  // Ensure last message is from assistant
  if (lastMessage?.type !== "assistant") {
    throw new Error(
      isSynthesis
        ? "Synthesis: Last message was not an assistant message"
        : `Agent ${agentIndex + 1}: Last message was not an assistant message`
    );
  }

  // Calculate token usage
  const usage = lastMessage.message.usage;
  const totalTokens =
    (usage.cache_creation_input_tokens ?? 0) +
    (usage.cache_read_input_tokens ?? 0) +
    usage.input_tokens +
    usage.output_tokens;

  // Extract only text content from the last message
  const textContent = lastMessage.message.content.filter(
    (contentItem) => contentItem.type === "text"
  );

  // Add the full message chain to the message handler
  _B0([...initialMessages, ...processedMessages]);

  // Yield the final result
  yield {
    type: "result",
    data: {
      agentIndex,
      content: textContent,
      toolUseCount,
      tokens: totalTokens,
      usage
    }
  };
}

module.exports = runAgentMessageProcessingLoop;