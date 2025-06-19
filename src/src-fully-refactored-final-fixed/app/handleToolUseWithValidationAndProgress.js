/**
 * Handles the execution of a tool with input validation, custom input validation, permission checks, and progress/result reporting.
 * This function validates the input, checks permissions, runs the tool, and yields progress or result blocks as needed.
 *
 * @async
 * @generator
 * @param {Object} tool - The tool object containing schema, name, and execution logic.
 * @param {string} toolUseId - Unique identifier for this tool use instance.
 * @param {Object} rawInput - The raw input object to validate and pass to the tool.
 * @param {Object} context - Contextual information for tool execution (e.g., user/session info).
 * @param {Function} permissionCheckFn - Async function to check if tool use is allowed. Receives (tool, validatedInput, context, envelope).
 * @param {Object} envelope - Envelope object containing metadata (e.g., message info).
 * @yields {Object} Progress or result blocks for the tool use.
 * @returns {Promise<void>} Returns when the tool use is complete or fails.
 */
async function* handleToolUseWithValidationAndProgress(tool, toolUseId, rawInput, context, permissionCheckFn, envelope) {
  // Step 1: Validate input schema
  const inputValidationResult = tool.inputSchema.safeParse(rawInput);
  if (!inputValidationResult.success) {
    const formattedError = formatValidationErrorMessages(tool.name, inputValidationResult.error);
    // Log validation error
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      error: "InputValidationError",
      messageID: envelope.message.id,
      toolName: tool.name
    });
    // Yield error block
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: `InputValidationError: ${formattedError}`,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `InputValidationError: ${inputValidationResult.error.message}`
    });
    return;
  }

  // Step 2: (Redundant) Validate input schema again (preserved for compatibility)
  const inputValidationResult2 = tool.inputSchema.safeParse(rawInput);
  if (!inputValidationResult2.success) {
    const formattedError = formatValidationErrorMessages(tool.name, inputValidationResult2.error);
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: `InputValidationError: ${formattedError}`,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `InputValidationError: ${inputValidationResult2.error.message}`
    });
    return;
  }

  // Step 3: Optional custom input validation (e.g., business logic)
  const customValidationResult = await tool.validateInput?.(inputValidationResult2.data, context);
  if (customValidationResult?.result === false) {
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      messageID: envelope.message.id,
      toolName: tool.name,
      errorCode: customValidationResult.errorCode
    });
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: customValidationResult.message,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `Error: ${customValidationResult.message}`
    });
    return;
  }

  // Step 4: Permission/behavior check before running the tool
  const permissionResult = await permissionCheckFn(tool, inputValidationResult2.data, context, envelope);
  if (permissionResult.behavior !== "allow") {
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: permissionResult.message,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `Error: ${permissionResult.message}`
    });
    return;
  }

  // Step 5: Run the tool and handle progress/results
  const startTime = Date.now();
  try {
    // Call the tool'createInteractionAccessor main function (may be async iterable)
    const toolCallIterator = tool.call(permissionResult.updatedInput, {
      ...context,
      userModified: permissionResult.userModified ?? false
    }, permissionCheckFn, envelope);
    for await (const toolEvent of toolCallIterator) {
      switch (toolEvent.type) {
        case "result": {
          const durationMs = Date.now() - startTime;
          // Log success
          logTelemetryEventIfEnabled("tengu_tool_use_success", {
            messageID: envelope.message.id,
            toolName: tool.name,
            isMcp: tool.isMcp ?? false,
            durationMs
          });
          SK("tool_result", {
            tool_name: tool.name,
            success: "true",
            duration_ms: String(durationMs)
          });
          // Yield result block
          yield createUserMessageObject({
            content: [tool.mapToolResultToToolResultBlockParam(toolEvent.data, toolUseId)],
            toolUseResult: toolEvent.data
          });
          break;
        }
        case "progress": {
          // Log progress
          logTelemetryEventIfEnabled("tengu_tool_use_progress", {
            messageID: envelope.message.id,
            toolName: tool.name,
            isMcp: tool.isMcp ?? false
          });
          // Yield progress block
          yield createProgressEvent({
            toolUseID: toolEvent.toolUseID,
            parentToolUseID: toolUseId,
            data: toolEvent.data
          });
          break;
        }
      }
    }
  } catch (error) {
    const durationMs = Date.now() - startTime;
    // Only log/report if not a known control-flow error
    if (!(error instanceof KG)) {
      if (!(error instanceof $M)) {
        reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      }
      logTelemetryEventIfEnabled("tengu_tool_use_error", {
        messageID: envelope.message.id,
        toolName: tool.name,
        isMcp: tool.isMcp ?? false
      });
      SK("tool_result", {
        tool_name: tool.name,
        use_id: toolUseId,
        success: "false",
        duration_ms: String(durationMs),
        error: error instanceof Error ? error.message : String(error)
      });
    }
    // Format and yield error block
    const formattedError = formatErrorOrValue(error);
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: formattedError,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `Error: ${formattedError}`
    });
  }
}

module.exports = handleToolUseWithValidationAndProgress;