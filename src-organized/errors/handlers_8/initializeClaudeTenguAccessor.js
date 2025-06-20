/**
 * Initializes the Claude Tengu accessor, sets up tool capability handlers, and connects the accessor instance.
 *
 * @param {any} sourceObservable - The source observable or entrypoint for the accessor.
 * @param {object} debugConfig - Debug configuration options.
 * @param {boolean} verboseLogging - Whether to enable verbose logging.
 * @returns {Promise<void>} Resolves when the accessor is connected and ready.
 */
async function initializeClaudeTenguAccessor(sourceObservable, debugConfig, verboseLogging) {
  // Set the environment variable to indicate the entry point
  process.env.CLAUDE_CODE_ENTRYPOINT = "mcp";
  setShellCurrentWorkingDirectory(sourceObservable);

  // Create the accessor instance with metadata and capabilities
  const accessorInstance = new Z0A({
    name: "claude/tengu",
    version: {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    }.VERSION
  }, {
    capabilities: {
      tools: {}
    }
  });

  // Handler for listing available tools and their descriptions
  accessorInstance.setRequestHandler(yc1, async () => {
    // Get the current tool permission context
    const toolPermissionContext = KX();
    // Retrieve the list of enabled tools from the configuration
    const enabledTools = Hk(toolPermissionContext, getCachedOrFreshConfig().todoFeatureEnabled);
    // Return the tool metadata with resolved descriptions and input schemas
    return {
      tools: await Promise.all(
        enabledTools.map(async tool => ({
          ...tool,
          description: await tool.description({}, {
            isNonInteractiveSession: true,
            getToolPermissionContext: () => toolPermissionContext,
            tools: enabledTools
          }),
          inputSchema: generateJsonSchemaFromDefinition(tool.inputSchema)
        }))
      )
    };
  });

  // Handler for invoking a specific tool by name with arguments
  accessorInstance.setRequestHandler(xc1, async ({
    params: {
      name: toolName,
      arguments: toolArguments
    }
  }) => {
    // Get the list of enabled tools for the current context
    const enabledTools = Hk(KX(), getCachedOrFreshConfig().todoFeatureEnabled);
    // Find the requested tool by name
    const selectedTool = enabledTools.find(tool => tool.name === toolName);
    if (!selectedTool) {
      throw new Error(`Tool ${toolName} not found`);
    }
    try {
      // Ensure the tool is enabled
      if (!selectedTool.isEnabled()) {
        throw new Error(`Tool ${toolName} is not enabled`);
      }
      // Prepare the main loop model
      const mainLoopModel = getProcessedInteractionRoute();
      // Validate the tool input if a validator is present
      const validationResult = await selectedTool.validateInput?.(toolArguments ?? {}, {
        abortController: new AbortController(),
        options: {
          commands: E_2,
          tools: enabledTools,
          mainLoopModel,
          maxThinkingTokens: 0,
          mcpClients: [],
          mcpResources: {},
          isNonInteractiveSession: true,
          debug: debugConfig,
          verbose: verboseLogging
        },
        getQueuedCommands: () => [],
        getToolPermissionContext: KX,
        removeQueuedCommands: () => {},
        readFileState: w_2.readFileState,
        setInProgressToolUseIDs: () => {},
        agentId: g9()
      });
      // If validation failed, throw an error
      if (validationResult && !validationResult.result) {
        throw new Error(`Tool ${toolName} input is invalid: ${validationResult.message}`);
      }
      // Call the tool with the provided arguments and context
      const toolCallPromise = selectedTool.call(toolArguments ?? {}, {
        abortController: new AbortController(),
        options: {
          commands: E_2,
          tools: enabledTools,
          mainLoopModel: getProcessedInteractionRoute(),
          maxThinkingTokens: 0,
          mcpClients: [],
          mcpResources: {},
          isNonInteractiveSession: true,
          debug: debugConfig,
          verbose: verboseLogging
        },
        getQueuedCommands: () => [],
        getToolPermissionContext: KX,
        removeQueuedCommands: () => {},
        readFileState: w_2.readFileState,
        setInProgressToolUseIDs: () => {},
        agentId: g9()
      }, evaluateToolPermission, streamAsyncIterableToWritable$({ content: [] }));
      // Await the tool'createInteractionAccessor result
      const toolResult = await getLastItemFromAsyncIterable(toolCallPromise);
      // Ensure the tool returned a result
      if (toolResult.type !== "result") {
        throw new Error(`Tool ${toolName} did not return a result`);
      }
      // Format the result content for the response
      return {
        content: Array.isArray(toolResult)
          ? toolResult.map(item => ({
              type: "text",
              text: "text" in item ? item.text : JSON.stringify(item)
            }))
          : [{
              type: "text",
              text: typeof toolResult === "string" ? toolResult : JSON.stringify(toolResult.data)
            }]
      };
    } catch (error) {
      // Log the error and return an error response
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      return {
        isError: true,
        content: [{
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }]
      };
    }
  });

  /**
   * Connects the accessor instance to its communication channel.
   * @returns {Promise<void>}
   */
  async function connectAccessor() {
    const accessorChannel = new D0A();
    await accessorInstance.connect(accessorChannel);
  }

  // Connect the accessor and return
  return await connectAccessor();
}

module.exports = initializeClaudeTenguAccessor;