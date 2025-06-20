/**
 * Handles the asynchronous execution of a tool, manages its in-progress state, error reporting, and cancellation.
 * This async generator yields results as they are produced by the tool.
 *
 * @param {Object} toolUseRequest - The request object containing tool use information (id, name, input, etc).
 * @param {Object} toolUseConfig - Configuration or context needed for tool execution.
 * @param {Object} toolUseSubscription - Subscription or context for tool use (e.g., for cancellation or tracking).
 * @param {Object} toolManager - Manager object providing options, state setters, and abort controller.
 * @yields {Object} - Yields tool result objects as they are produced.
 */
async function* handleToolUseAsyncGenerator(toolUseRequest, toolUseConfig, toolUseSubscription, toolManager) {
  const toolName = toolUseRequest.name;
  // Find the tool definition from available tools
  const toolDefinition = toolManager.options.tools.find(tool => tool.name === toolName);

  // Mark this tool use as in-progress
  toolManager.setInProgressToolUseIDs((currentSet) => new Set([...currentSet, toolUseRequest.id]));

  /**
   * Helper to remove this tool use from the in-progress set
   */
  function clearInProgressToolUse() {
    toolManager.setInProgressToolUseIDs((currentSet) => new Set([...currentSet].filter(id => id !== toolUseRequest.id)));
  }

  // If the tool is not found, report error and yield error result
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
    clearInProgressToolUse();
    return;
  }

  const toolInput = toolUseRequest.input;
  try {
    // If the operation was aborted before starting, report cancellation
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
      clearInProgressToolUse();
      return;
    }

    // Delegate to the tool'createInteractionAccessor async generator and yield each result
    for await (const toolResult of handleToolUseInteraction(toolDefinition, toolUseRequest.id, toolInput, toolManager, toolUseSubscription, toolUseConfig)) {
      yield toolResult;
    }
  } catch (error) {
    // Log error and yield error result
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
  clearInProgressToolUse();
}

module.exports = handleToolUseAsyncGenerator;