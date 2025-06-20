/**
 * Runs an interactive session with a conversational getArrayElementByCircularIndex agent, managing tool permissions, message flow, and session state.
 * Handles system initialization, user/assistant message exchange, tool permission prompts, and session result reporting.
 *
 * @async
 * @generator
 * @param {Object} params - The configuration and context for the session.
 * @param {Array} params.commands - List of available commands for the session.
 * @param {Object} params.permissionContext - Context object for tool permission evaluation.
 * @param {string} params.prompt - The initial user prompt to start the session.
 * @param {string} params.cwd - Current working directory for the session.
 * @param {Array} params.tools - Array of tool objects available to the agent.
 * @param {Array} params.mcpClients - Array of MCP client objects.
 * @param {boolean} [params.verbose=false] - Enables verbose logging if true.
 * @param {number} params.maxTurns - Maximum number of user turns allowed in the session.
 * @param {Object} params.permissionPromptTool - Tool used to prompt for permission if needed.
 * @param {Array} [params.initialMessages=[]] - Initial message history for the session.
 * @param {string} params.customSystemPrompt - Optional custom system prompt to prepend.
 * @param {string} params.appendSystemPrompt - Optional system prompt to append.
 * @param {string} params.userSpecifiedModel - Optional user-specified model name.
 * @param {Function} [params.getQueuedCommands=() => []] - Function to get queued commands.
 * @param {Function} [params.removeQueuedCommands=() => {}] - Function to remove queued commands.
 * @yields {Object} Session events and results as they occur.
 * @returns {AsyncGenerator<Object>} Yields session events and final result.
 */
async function* runInteractiveSession({
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
  // Set environment variable and perform initial setup
  process.env.CLAUDE_CODE_ENTRYPOINT = "sdk-cli";
  setShellCurrentWorkingDirectory(cwd);

  const sessionStartTime = Date.now();
  const model = userSpecifiedModel ? Sb(userSpecifiedModel) : getProcessedInteractionRoute();

  // Prepare tools, user workspace, and environment
  const [preparedTools, userWorkspace, environment] = await Promise.all([
    Zj(tools, model),
    UW(),
    WE(true)
  ]);

  // Build the system prompt sequence
  const systemPrompts = [
    ...(customSystemPrompt ? [customSystemPrompt] : preparedTools),
    ...(appendSystemPrompt ? [appendSystemPrompt] : [])
  ];

  // Initialize message history
  let messageHistory = HU5(initialMessages);

  // Session context object
  let sessionContext = {
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

  // Add the initial user prompt to the message history
  const promptResult = await handleUserInput(
    prompt,
    "prompt",
    () => {},
    { ...sessionContext, messages: messageHistory },
    null,
    null
  );
  messageHistory = [...messageHistory, ...promptResult.messages];
  let maxThinkingTokens = Kk(messageHistory);

  // Update session context if tokens increased
  if (maxThinkingTokens > 0) {
    sessionContext = {
      messages: messageHistory,
      setMessages: () => {},
      onChangeAPIKey: () => {},
      options: {
        commands,
        debug: false,
        tools,
        verbose,
        mainLoopModel: model,
        maxThinkingTokens,
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
   * Handles tool permission evaluation, including optional interactive permission prompt.
   * @param {Object} tool - The tool to evaluate.
   * @param {Object} toolInput - The input for the tool.
   * @param {Object} session - The session context.
   * @param {Object} permissionContext - The permission context.
   * @returns {Promise<Object>} The permission evaluation result.
   */
  const handleToolPermission = async (tool, toolInput, session, permissionContext) => {
    // Evaluate tool permission using rules/context
    const permissionResult = await evaluateToolPermission(tool, toolInput, session, permissionContext);
    if (permissionResult.behavior === "allow" || permissionResult.behavior === "deny") {
      return permissionResult;
    }
    // If permissionPromptTool is provided, use isBlobOrFileLikeObject to prompt the user interactively
    if (permissionPromptTool) {
      for await (const promptEvent of permissionPromptTool.call({
        tool_name: tool.name,
        input: toolInput
      }, session, handleToolPermission, permissionContext)) {
        if (promptEvent.type !== "result") continue;
        const mappedResult = permissionPromptTool.mapToolResultToToolResultBlockParam(promptEvent.data, "1");
        if (!mappedResult.content || !Array.isArray(mappedResult.content) || !mappedResult.content[0] || mappedResult.content[0].type !== "text" || typeof mappedResult.content[0].text !== "string") {
          throw new Error('Permission prompt tool returned an invalid result. Expected a single text block param with type="text" and a string text value.');
        }
        // Parse the permission result from the prompt tool'createInteractionAccessor output
        return formatPermissionPromptResult(g_2.parse(f8(mappedResult.content[0].text)), permissionPromptTool.name);
      }
    }
    return permissionResult;
  };

  // Yield system initialization event
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

  // Main session loop: process messages and events
  for await (const event of processStreamWithCompactionAndToolUse(messageHistory, systemPrompts, userWorkspace, environment, handleToolPermission, sessionContext)) {
    // Add assistant/user messages to history and update token usage
    if (event.type === "assistant" || event.type === "user") {
      messageHistory.push(event);
      Y71(messageHistory);
    }
    switch (event.type) {
      case "assistant":
      case "progress":
      case "user":
        yield* generateInteractionMessages(event);
        break;
      case "stream_event":
        // Update token usage statistics on streaming events
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
        // No action needed for these event types
        break;
    }
    // Check for max turns limit
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
  const lastAssistantMessage = CD(messageHistory);
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

  // Extract the result content from the assistant message
  const resultContent = CD(lastAssistantMessage.message.content);
  if (resultContent?.type !== "text" && resultContent?.type !== "thinking" && resultContent?.type !== "redacted_thinking") {
    throw new Error(`Expected first content item to be text or thinking, but got ${JSON.stringify(lastAssistantMessage.message.content[0], null, 2)}`);
  }

  // Yield the final successful result
  yield {
    type: "result",
    subtype: "success",
    cost_usd: SJ(),
    is_error: Boolean(lastAssistantMessage.isApiErrorMessage),
    duration_ms: Date.now() - sessionStartTime,
    duration_api_ms: uT(),
    num_turns: messageHistory.length - 1,
    result: resultContent.type === "text" ? resultContent.text : "",
    session_id: g9(),
    total_cost: SJ(),
    usage: tokenUsageStats
  };
}

module.exports = runInteractiveSession;