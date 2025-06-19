/**
 * Runs an agent interaction session, processing messages and yielding progress/results.
 *
 * @async
 * @generator
 * @param {string} initialPrompt - The initial prompt or message content for the agent.
 * @param {number} agentIndex - The index of the agent (used for result reporting).
 * @param {object} sessionContext - Context object containing controllers, options, and tool info.
 * @param {object} inputMessage - The input message object (contains message id, etc.).
 * @param {object} globalConfig - Global configuration or state for the session.
 * @param {object} [agentOptions={}] - Optional agent-specific options (e.g., isSynthesis, systemPrompt, model).
 * @yields {object} Progress or result objects as the agent processes messages.
 * @throws {Error} If the last message is not from the assistant or if a known error is detected.
 */
async function* runAgentInteractionSession(
  initialPrompt,
  agentIndex,
  sessionContext,
  inputMessage,
  globalConfig,
  agentOptions = {}
) {
  // Destructure session context
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
  } = sessionContext;

  // Destructure agent options
  const {
    isSynthesis = false,
    systemPrompt,
    model
  } = agentOptions;

  // Generate a unique agent/session id
  const agentId = tw5();

  // Prepare initial message list
  const initialMessages = [createUserMessageObject({ content: initialPrompt })];

  // Prepare dependencies in parallel
  const [toolWhitelist, environment, selectedModel] = await Promise.all([
    UW(),
    WE(isNonInteractiveSession ?? false),
    model ?? getProcessedInteractionRoute()
  ]);

  // Get the system prompt (either provided or generated)
  const resolvedSystemPrompt = await (systemPrompt ?? Mn0(selectedModel));

  // Store all processed messages
  const processedMessages = [];
  // Track tool use count
  let toolUseCount = 0;

  // Main message processing loop
  for await (const message of processStreamWithCompactionAndToolUse(initialMessages, resolvedSystemPrompt, toolWhitelist, environment, globalConfig, {
    abortController,
    options: {
      isNonInteractiveSession: isNonInteractiveSession ?? false,
      tools,
      commands: [],
      debug: isDebugMode,
      verbose: isVerbose,
      mainLoopModel: selectedModel,
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
    if (message.type !== "assistant" && message.type !== "user" && message.type !== "progress") continue;
    processedMessages.push(message);

    // Only process assistant or user messages for tool use/result
    if (message.type !== "assistant" && message.type !== "user") continue;

    // Normalize all messages up to this point
    const normalizedMessages = s3(processedMessages);

    // For each content item in the current message
    for (const normalizedMessage of s3([message])) {
      for (const contentItem of normalizedMessage.message.content) {
        // Only process tool_use or tool_result content
        if (contentItem.type !== "tool_use" && contentItem.type !== "tool_result") continue;
        if (contentItem.type === "tool_use") toolUseCount++;
        // Yield progress update
        yield {
          type: "progress",
          toolUseID: isSynthesis
            ? `synthesis_${inputMessage.message.id}`
            : `agent_${agentIndex}_${inputMessage.message.id}`,
          data: {
            message: normalizedMessage,
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

  // If the last message is not from the assistant, throw
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

  // Filter out only text content from the last message
  const textContent = lastMessage.message.content.filter(
    (contentItem) => contentItem.type === "text"
  );

  // Finalize state (side effect)
  _B0([...initialMessages, ...processedMessages]);

  // Yield the final result
  yield {
    type: "result",
    data: {
      agentIndex,
      content: textContent,
      toolUseCount,
      tokens: totalTokens,
      usage: lastMessage.message.usage
    }
  };
}

module.exports = runAgentInteractionSession;