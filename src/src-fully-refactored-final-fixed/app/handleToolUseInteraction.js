/**
 * Handles the full lifecycle of a tool use interaction, including input validation, permission checks, execution, progress reporting, and error handling.
 *
 * @async
 * @generator
 * @param {Object} tool - The tool definition object. Must include inputSchema, name, call, mapToolResultToToolResultBlockParam, and optionally isMcp and validateInput.
 * @param {string} toolUseId - Unique identifier for this tool use instance.
 * @param {Object} toolInput - The input provided for the tool, to be validated and passed to the tool.
 * @param {Object} context - Context object for the tool call, may include user/session info.
 * @param {Function} permissionCheckFn - Async function to check if the tool use is allowed. Receives (tool, validatedInput, context, messageEnvelope).
 * @param {Object} messageEnvelope - Envelope containing message metadata, including message.id.
 * @yields {Object} Tool result or progress update objects to be sent to the user interface.
 * @returns {AsyncGenerator<Object>} Yields tool result or progress objects for UI consumption.
 */
async function* handleToolUseInteraction(tool, toolUseId, toolInput, context, permissionCheckFn, messageEnvelope) {
  // Step 1: Validate input using the tool'createInteractionAccessor schema
  const inputValidationResult = tool.inputSchema.safeParse(toolInput);
  if (!inputValidationResult.success) {
    // Format and report validation error
    const formattedError = formatValidationErrorMessage(tool.name, inputValidationResult.error);
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      error: "InputValidationError",
      messageID: messageEnvelope.message.id,
      toolName: tool.name
    });
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

  // Step 2: (Redundant) Validate input again (kept for parity with original logic)
  const inputValidationResult2 = tool.inputSchema.safeParse(toolInput);
  if (!inputValidationResult2.success) {
    const formattedError = formatValidationErrorMessage(tool.name, inputValidationResult2.error);
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

  // Step 3: Optional custom input validation
  const customValidationResult = await tool.validateInput?.(inputValidationResult2.data, context);
  if (customValidationResult?.result === false) {
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      messageID: messageEnvelope.message.id,
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

  // Step 4: Permission check (e.g., rate limits, user permissions, etc.)
  const permissionResult = await permissionCheckFn(tool, inputValidationResult2.data, context, messageEnvelope);
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

  // Step 5: Execute the tool and handle results/progress/errors
  const startTime = Date.now();
  try {
    // Prepare call options, including any user modifications
    const callOptions = {
      ...context,
      userModified: permissionResult.userModified ?? false
    };
    // Call the tool'createInteractionAccessor main function (may be async generator)
    const toolCallIterator = tool.call(permissionResult.updatedInput, callOptions, permissionCheckFn, messageEnvelope);
    for await (const toolCallResult of toolCallIterator) {
      switch (toolCallResult.type) {
        case "result": {
          const durationMs = Date.now() - startTime;
          logTelemetryEventIfEnabled("tengu_tool_use_success", {
            messageID: messageEnvelope.message.id,
            toolName: tool.name,
            isMcp: tool.isMcp ?? false,
            durationMs
          });
          SK("tool_result", {
            tool_name: tool.name,
            success: "true",
            duration_ms: String(durationMs)
          });
          yield createUserMessageObject({
            content: [tool.mapToolResultToToolResultBlockParam(toolCallResult.data, toolUseId)],
            toolUseResult: toolCallResult.data
          });
          break;
        }
        case "progress": {
          logTelemetryEventIfEnabled("tengu_tool_use_progress", {
            messageID: messageEnvelope.message.id,
            toolName: tool.name,
            isMcp: tool.isMcp ?? false
          });
          yield createProgressEvent({
            toolUseID: toolCallResult.toolUseID,
            parentToolUseID: toolUseId,
            data: toolCallResult.data
          });
          break;
        }
      }
    }
  } catch (error) {
    const durationMs = Date.now() - startTime;
    // Only log/report if not a known 'KG' error
    if (!(error instanceof KG)) {
      if (!(error instanceof $M)) {
        reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      }
      logTelemetryEventIfEnabled("tengu_tool_use_error", {
        messageID: messageEnvelope.message.id,
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
    // Format error for user display
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

module.exports = handleToolUseInteraction;