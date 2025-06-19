/**
 * Runs an interactive agent session, handling user commands, tool permissions, and message streaming.
 *
 * @async
 * @generator
 * @param {Object} options - Configuration options for the agent session.
 * @param {Array} options.commands - List of available commands for the agent.
 * @param {Object} options.permissionContext - Context for tool permission evaluation.
 * @param {string} options.prompt - The initial user prompt.
 * @param {string} options.cwd - Current working directory.
 * @param {Array} options.tools - Array of tool objects available to the agent.
 * @param {Array} options.mcpClients - List of MCP client objects.
 * @param {boolean} [options.verbose=false] - Whether to enable verbose logging.
 * @param {number} [options.maxTurns] - Maximum number of user/assistant turns allowed.
 * @param {Object} [options.permissionPromptTool] - Tool for prompting user for permission.
 * @param {Array} [options.initialMessages=[]] - Initial message history for the session.
 * @param {string} [options.customSystemPrompt] - Custom system prompt to prepend to messages.
 * @param {string} [options.appendSystemPrompt] - System prompt to append to messages.
 * @param {string} [options.userSpecifiedModel] - User-specified model name.
 * @param {Function} [options.getQueuedCommands=() => []] - Function to get queued commands.
 * @param {Function} [options.removeQueuedCommands=() => {}] - Function to remove queued commands.
 * @yields {Object} Streamed events and final result objects.
 */
async function* runInteractiveAgentSession({
  commands,
  permissionContext,
  prompt,
  cwd,
  tools,
  mcpClients,
  verbose = false,
  maxTurns,
  permissionPromptTool,
  initialMessages = [],
  customSystemPrompt,
  appendSystemPrompt,
  userSpecifiedModel,
  getQueuedCommands = () => [],
  removeQueuedCommands = () => {}
}) {
  // Set environment variable for code entrypoint
  process.env.CLAUDE_CODE_ENTRYPOINT = "sdk-cli";
  setShellCurrentWorkingDirectory(cwd);

  const sessionStartTime = Date.now();
  // Determine model to use
  const model = userSpecifiedModel ? Sb(userSpecifiedModel) : getProcessedInteractionRoute();

  // Prepare system prompts and dependencies
  const [defaultSystemPrompts, workspaceId, workspaceEnv] = await Promise.all([
    Zj(tools, model),
    UW(),
    WE(true)
  ]);

  // Compose system prompt list
  const systemPrompts = [
    ...(customSystemPrompt ? [customSystemPrompt] : defaultSystemPrompts),
    ...(appendSystemPrompt ? [appendSystemPrompt] : [])
  ];

  // Initialize message history
  let messageHistory = HU5(initialMessages);

  // Prepare agent context
  let agentContext = {
    messages: messageHistory,
    setMessages: () => {},
    onChangeAPIKey: () => {},
    options: {
      commands,
      debug: false,
      tools,
      verbose,
      mainLoopModel: model,
      maxThinkingTokens: Kk(messageHistory),
      mcpClients,
      mcpResources: {},
      ideInstallationStatus: null,
      isNonInteractiveSession: true
    },
    getToolPermissionContext: () => permissionContext,
    getQueuedCommands: () => [],
    removeQueuedCommands: () => {},
    abortController: new AbortController(),
    readFileState: {},
    setInProgressToolUseIDs: () => {},
    setToolPermissionContext: () => {},
    agentId: g9()
  };

  // Add the initial prompt as a user message
  const promptResult = await handleUserInput(
    prompt,
    "prompt",
    () => {},
    { ...agentContext, messages: messageHistory },
    null,
    null
  );
  const extendedMessageHistory = [...messageHistory, ...promptResult.messages];
  const maxTokens = Kk(extendedMessageHistory);

  // If token count increased, update agent context
  if (maxTokens > 0) {
    agentContext = {
      messages: extendedMessageHistory,
      setMessages: () => {},
      onChangeAPIKey: () => {},
      options: {
        commands,
        debug: false,
        tools,
        verbose,
        mainLoopModel: model,
        maxThinkingTokens: maxTokens,
        mcpClients,
        mcpResources: {},
        ideInstallationStatus: null,
        isNonInteractiveSession: true
      },
      getToolPermissionContext: () => permissionContext,
      abortController: new AbortController(),
      readFileState: {},
      setToolPermissionContext: () => {},
      getQueuedCommands,
      removeQueuedCommands,
      setInProgressToolUseIDs: () => {},
      agentId: g9()
    };
  }

  /**
   * Handles tool permission evaluation, including optional user prompt via permissionPromptTool.
   * @param {Object} tool - Tool object.
   * @param {Object} toolInput - Input for the tool.
   * @param {Object} context - Permission context.
   * @param {Object} agentContext - Agent context.
   * @returns {Promise<Object>} Permission decision object.
   */
  const evaluatePermissionWithPrompt = async (tool, toolInput, context, agentContext) => {
    // Evaluate permission using rules
    const permissionDecision = await evaluateToolPermission(tool, toolInput, context, agentContext);
    if (permissionDecision.behavior === "allow" || permissionDecision.behavior === "deny") {
      return permissionDecision;
    }
    // If a permission prompt tool is provided, use isBlobOrFileLikeObject to ask the user
    if (permissionPromptTool) {
      for await (const promptResult of permissionPromptTool.call({
        tool_name: tool.name,
        input: toolInput
      }, context, evaluatePermissionWithPrompt, agentContext)) {
        if (promptResult.type !== "result") continue;
        const mappedResult = permissionPromptTool.mapToolResultToToolResultBlockParam(promptResult.data, "1");
        if (!mappedResult.content || !Array.isArray(mappedResult.content) || !mappedResult.content[0] || mappedResult.content[0].type !== "text" || typeof mappedResult.content[0].text !== "string") {
          throw new Error('Permission prompt tool returned an invalid result. Expected a single text block param with type="text" and a string text value.');
        }
        // Parse the user'createInteractionAccessor response and return the permission decision
        return formatPermissionPromptResult(g_2.parse(f8(mappedResult.content[0].text)), permissionPromptTool.name);
      }
    }
    // Default: return original permission decision
    return permissionDecision;
  };

  // Yield initial system event
  yield {
    type: "system",
    subtype: "init",
    cwd,
    session_id: g9(),
    tools: tools.map(tool => tool.name),
    mcp_servers: mcpClients.map(client => ({
      name: client.name,
      status: client.type
    })),
    model,
    permissionMode: permissionContext.mode,
    apiKeySource: getAnthropicApiKeySource(true).source
  };

  let tokenUsageStats = od;
  let turnCount = 0;

  // Main session loop: process streamed agent events
  for await (const event of processStreamWithCompactionAndToolUse(extendedMessageHistory, systemPrompts, workspaceId, workspaceEnv, evaluatePermissionWithPrompt, agentContext)) {
    // Add assistant/user messages to history and update token stats
    if (event.type === "assistant" || event.type === "user") {
      extendedMessageHistory.push(event);
      Y71(extendedMessageHistory);
    }
    switch (event.type) {
      case "assistant":
      case "progress":
      case "user":
        yield* generateInteractionMessages(event);
        break;
      case "stream_event":
        // Update token usage stats for streaming events
        if (event.event.type === "message_start") {
          tokenUsageStats = mergeTokenUsageStats(tokenUsageStats, event.event.message.usage);
        }
        if (event.event.type === "message_delta") {
          tokenUsageStats = mergeTokenUsageStats(tokenUsageStats, event.event.usage);
        }
        break;
      case "attachment":
      case "stream_request_start":
      case "system":
        // No action needed
        break;
    }
    // If user turn and maxTurns is set, check for session end
    if (event.type === "user" && maxTurns && ++turnCount >= maxTurns) {
      yield {
        type: "result",
        subtype: "error_max_turns",
        cost_usd: SJ(),
        duration_ms: Date.now() - sessionStartTime,
        duration_api_ms: uT(),
        is_error: false,
        num_turns: turnCount,
        session_id: g9(),
        total_cost: SJ(),
        usage: tokenUsageStats
      };
      return;
    }
  }

  // Find the last assistant message in the history
  const lastAssistantMessage = CD(extendedMessageHistory);
  if (!lastAssistantMessage || lastAssistantMessage.type !== "assistant") {
    yield {
      type: "result",
      subtype: "error_during_execution",
      cost_usd: SJ(),
      duration_ms: Date.now() - sessionStartTime,
      duration_api_ms: uT(),
      is_error: false,
      num_turns: turnCount,
      session_id: g9(),
      total_cost: SJ(),
      usage: tokenUsageStats
    };
    return;
  }

  // Extract the first content block from the assistant'createInteractionAccessor message
  const firstContentBlock = CD(lastAssistantMessage.message.content);
  if (firstContentBlock?.type !== "text" && firstContentBlock?.type !== "thinking" && firstContentBlock?.type !== "redacted_thinking") {
    throw new Error(`Expected first content item to be text or thinking, but got ${JSON.stringify(lastAssistantMessage.message.content[0], null, 2)}`);
  }

  // Yield final result
  yield {
    type: "result",
    subtype: "success",
    cost_usd: SJ(),
    is_error: Boolean(lastAssistantMessage.isApiErrorMessage),
    duration_ms: Date.now() - sessionStartTime,
    duration_api_ms: uT(),
    num_turns: extendedMessageHistory.length - 1,
    result: firstContentBlock.type === "text" ? firstContentBlock.text : "",
    session_id: g9(),
    total_cost: SJ(),
    usage: tokenUsageStats
  };
}

module.exports = runInteractiveAgentSession;