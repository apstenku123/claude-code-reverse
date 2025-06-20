/**
 * Handles the execution of a tool by name, manages its progress state, error handling, and logging.
 * This async generator yields tool results or error messages as appropriate, and ensures proper cleanup.
 *
 * @async
 * @generator
 * @param {Object} toolUseRequest - The tool use request object, containing name, id, and input.
 * @param {Object} toolUseConfig - Configuration or context for the tool use.
 * @param {Object} subscription - Subscription or context object passed to the tool execution.
 * @param {Object} toolManager - Manager object providing options, in-progress tracking, and abort control.
 * @yields {Object} Tool result or error message object.
 */
async function* handleToolUseWithLogging(toolUseRequest, toolUseConfig, subscription, toolManager) {
  const toolName = toolUseRequest.name;
  // Find the tool definition by name from the available tools
  const toolDefinition = toolManager.options.tools.find(tool => tool.name === toolName);

  // Mark this tool use as in-progress
  toolManager.setInProgressToolUseIDs(currentSet => new Set([...currentSet, toolUseRequest.id]));

  /**
   * Helper to remove this tool use from the in-progress set
   */
  function cleanupInProgress() {
    toolManager.setInProgressToolUseIDs(currentSet => new Set([...currentSet].filter(id => id !== toolUseRequest.id)));
  }

  // If the tool is not found, log error and yield an error result
  if (!toolDefinition) {
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      error: `No such tool available: ${toolName}`,
      toolName: toolName,
      toolUseID: toolUseRequest.id,
      isMcp: false
    });
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: `Error: No such tool available: ${toolName}`,
        is_error: true,
        tool_use_id: toolUseRequest.id
      }],
      toolUseResult: `Error: No such tool available: ${toolName}`
    });
    cleanupInProgress();
    return;
  }

  const toolInput = toolUseRequest.input;
  try {
    // If the operation was aborted, log cancellation and yield cancellation result
    if (toolManager.abortController.signal.aborted) {
      logTelemetryEventIfEnabled("tengu_tool_use_cancelled", {
        toolName: toolDefinition.name,
        toolUseID: toolUseRequest.id,
        isMcp: toolDefinition.isMcp ?? false
      });
      const cancelledContent = createToolErrorResult(toolUseRequest.id);
      yield createUserMessageObject({
        content: [cancelledContent],
        toolUseResult: qO
      });
      cleanupInProgress();
      return;
    }

    // Execute the tool and yield each result
    for await (const toolResult of handleToolUseInteraction(toolDefinition, toolUseRequest.id, toolInput, toolManager, subscription, toolUseConfig)) {
      yield toolResult;
    }
  } catch (error) {
    // Log and yield error if tool execution fails
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: "Error calling tool",
        is_error: true,
        tool_use_id: toolUseRequest.id
      }],
      toolUseResult: "Error calling tool"
    });
  }
  // Always cleanup in-progress state
  cleanupInProgress();
}

module.exports = handleToolUseWithLogging;