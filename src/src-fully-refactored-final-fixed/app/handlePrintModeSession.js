/**
 * Handles the print mode session logic for the CLI, including continue/resume session,
 * input validation, tool selection, and output formatting.
 *
 * @param {string|Array} userPromptOrStructuredInput - The user prompt as a string or structured input array.
 * @param {object} toolConfig - Configuration for tool execution.
 * @param {object} subscriptionConfig - Subscription configuration for the session.
 * @param {Array} inputTools - Array of input tool objects.
 * @param {Array} mcpTools - Array of MCP tool objects.
 * @param {Array} toolPlugins - Array of tool plugin objects.
 * @param {Array} recentInputEntries - Array of recent input entries.
 * @param {object} cliOptions - CLI options and flags.
 * @returns {Promise<void>} Resolves when the print mode session is handled and output is written.
 */
async function handlePrintModeSession(
  userPromptOrStructuredInput,
  toolConfig,
  subscriptionConfig,
  inputTools,
  mcpTools,
  toolPlugins,
  recentInputEntries,
  cliOptions
) {
  let previousMessages = [];

  // Handle --continue flag: resume previous session and print
  if (cliOptions.continue) {
    try {
      logTelemetryEventIfEnabled("tengu_continue_print", {});
      const continueSession = await getInteractionEntryByKey(0);
      if (continueSession) {
        processFirstMessageSession(continueSession);
        previousMessages = continueSession.messages;
      }
    } catch (error) {
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      process.exit(1);
    }
  }

  // Handle --resume flag: resume specific session by updateSnapshotAndNotify and print
  if (cliOptions.resume) {
    try {
      logTelemetryEventIfEnabled("tengu_resume_print", {});
      const sessionId = getValidRouteName(cliOptions.resume);
      if (!sessionId) {
        console.error("Error: --resume requires a valid session updateSnapshotAndNotify when used with --print");
        console.error("Usage: claude -createIterableHelper --resume <session-id>");
        if (typeof cliOptions.resume === "string" && !sessionId) {
          console.error("Session IDs must be in UUID format (e.g., 550e8400-e29b-41d4-a716-446655440000)");
          console.error(`Provided value \"${cliOptions.resume}\" is not a valid UUID`);
        }
        process.exit(1);
      }
      const resumedSession = await J71(sessionId);
      if (!resumedSession) {
        console.error(`No conversation found with session updateSnapshotAndNotify: ${sessionId}`);
        process.exit(1);
      }
      processFirstMessageSession(resumedSession);
      previousMessages = resumedSession.messages;
    } catch (error) {
      reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      console.error("Failed to resume session with --print mode");
      process.exit(1);
    }
  }

  // Prepare user input as structured input
  let structuredInput;
  if (typeof userPromptOrStructuredInput === "string") {
    structuredInput = iterateItemsAsync([
      JSON.stringify({
        type: "user",
        session_id: "",
        message: {
          role: "user",
          content: userPromptOrStructuredInput
        },
        parent_tool_use_id: null
      })
    ]);
  } else {
    structuredInput = userPromptOrStructuredInput;
  }

  const inputWrapper = new W0A(structuredInput);
  const isResume = Boolean(getValidRouteName(cliOptions.resume));

  // Validate input: must have prompt or be resuming
  if (!userPromptOrStructuredInput && !isResume) {
    console.error("Error: Input must be provided either through stdin or as a prompt argument when using --print");
    process.exit(1);
  }

  // Validate output format requirements
  if (cliOptions.outputFormat === "stream-json" && !cliOptions.verbose) {
    console.error("Error: When using --print, --output-format=stream-json requires --verbose");
    process.exit(1);
  }

  // Merge all available tools
  let availableTools = [...toolPlugins, ...recentInputEntries];
  let permissionPromptTool = undefined;

  // Handle --permission-prompt-tool flag: ensure tool exists and is valid
  if (cliOptions.permissionPromptToolName) {
    permissionPromptTool = recentInputEntries.find(
      tool => tool.name === cliOptions.permissionPromptToolName
    );
    if (!permissionPromptTool) {
      console.error(
        `Error: MCP tool ${cliOptions.permissionPromptToolName} (passed via --permission-prompt-tool) not found. Available MCP tools: ${recentInputEntries.map(tool => tool.name).join(", ") || "none"}`
      );
      process.exit(1);
    }
    if (!permissionPromptTool.inputJSONSchema) {
      console.error(
        `Error: tool ${cliOptions.permissionPromptToolName} (passed via --permission-prompt-tool) must be an MCP tool`
      );
      process.exit(1);
    }
    // Remove the permission prompt tool from the available tools list
    availableTools = availableTools.filter(
      tool => tool.name !== cliOptions.permissionPromptToolName
    );
  }

  // Collect results from the tool execution generator
  const executionResults = [];
  for await (const result of streamPromptSession(
    inputWrapper.structuredInput,
    toolConfig,
    subscriptionConfig,
    [...inputTools, ...mcpTools],
    availableTools,
    previousMessages,
    permissionPromptTool,
    cliOptions
  )) {
    if (cliOptions.outputFormat === "stream-json" && cliOptions.verbose) {
      writeStringInChunksToStdout(JSON.stringify(result) + "\n");
    }
    executionResults.push(result);
  }

  // Extract the final result message
  const finalResult = CD(executionResults);
  if (!finalResult || finalResult.type !== "result") {
    throw new Error("No messages returned");
  }

  // Output formatting based on CLI options
  switch (cliOptions.outputFormat) {
    case "json":
      if (cliOptions.verbose) {
        writeStringInChunksToStdout(JSON.stringify(executionResults) + "\n");
        break;
      }
      writeStringInChunksToStdout(JSON.stringify(finalResult) + "\n");
      break;
    case "stream-json":
      // Already streamed above
      break;
    default:
      switch (finalResult.subtype) {
        case "success":
          writeStringInChunksToStdout(finalResult.result.endsWith("\n") ? finalResult.result : finalResult.result + "\n");
          break;
        case "error_during_execution":
          writeStringInChunksToStdout("Execution error");
          break;
        case "error_max_turns":
          writeStringInChunksToStdout(`Error: Reached max turns (${cliOptions.maxTurns})`);
          break;
      }
  }

  // Exit with error code if result is error
  process.exit(finalResult.is_error ? 1 : 0);
}

module.exports = handlePrintModeSession;
