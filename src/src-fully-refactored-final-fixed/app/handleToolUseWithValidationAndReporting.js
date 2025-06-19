/**
 * Handles the execution of a tool with input validation, error reporting, and progress/result streaming.
 * Validates the input, calls optional custom validation, checks tool behavior, and streams results or errors.
 * Reports telemetry and analytics events throughout the process.
 *
 * @param {Object} toolDefinition - The tool definition object, containing schema, name, call method, etc.
 * @param {string} toolUseId - Unique identifier for this tool use instance.
 * @param {Object} toolInput - The input data to validate and pass to the tool.
 * @param {Object} toolContext - Contextual information for the tool execution (e.g., user, environment).
 * @param {Function} behaviorGuard - Function to check tool behavior and permissions.
 * @param {Object} messageEnvelope - Envelope containing message metadata (e.g., message.id).
 * @yields {Object} Tool result or progress blocks for streaming to the caller.
 */
async function* handleToolUseWithValidationAndReporting(
  toolDefinition,
  toolUseId,
  toolInput,
  toolContext,
  behaviorGuard,
  messageEnvelope
) {
  // Step 1: Validate input schema
  const inputValidationResult = toolDefinition.inputSchema.safeParse(toolInput);
  if (!inputValidationResult.success) {
    const formattedValidationError = formatValidationErrorMessage(toolDefinition.name, inputValidationResult.error);
    // Report input validation error event
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      error: "InputValidationError",
      messageID: messageEnvelope.message.id,
      toolName: toolDefinition.name
    });
    // Yield error block to caller
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: `InputValidationError: ${formattedValidationError}`,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `InputValidationError: ${inputValidationResult.error.message}`
    });
    return;
  }

  // Step 2: (Redundant) Validate input schema again (preserved for compatibility)
  const inputValidationResult2 = toolDefinition.inputSchema.safeParse(toolInput);
  if (!inputValidationResult2.success) {
    const formattedValidationError = formatValidationErrorMessage(toolDefinition.name, inputValidationResult2.error);
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: `InputValidationError: ${formattedValidationError}`,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `InputValidationError: ${inputValidationResult2.error.message}`
    });
    return;
  }

  // Step 3: Custom input validation if provided
  const customValidationResult = await toolDefinition.validateInput?.(inputValidationResult2.data, toolContext);
  if (customValidationResult?.result === false) {
    // Report custom validation error event
    logTelemetryEventIfEnabled("tengu_tool_use_error", {
      messageID: messageEnvelope.message.id,
      toolName: toolDefinition.name,
      errorCode: customValidationResult.errorCode
    });
    // Yield custom validation error block
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

  // Step 4: Check tool behavior/permissions
  const behaviorCheckResult = await behaviorGuard(toolDefinition, inputValidationResult2.data, toolContext, messageEnvelope);
  if (behaviorCheckResult.behavior !== "allow") {
    yield createUserMessageObject({
      content: [{
        type: "tool_result",
        content: behaviorCheckResult.message,
        is_error: true,
        tool_use_id: toolUseId
      }],
      toolUseResult: `Error: ${behaviorCheckResult.message}`
    });
    return;
  }

  // Step 5: Execute tool and stream results/progress
  const startTime = Date.now();
  try {
    // Call the tool'createInteractionAccessor main method, passing updated input and context
    const toolCallIterator = toolDefinition.call(
      behaviorCheckResult.updatedInput,
      {
        ...toolContext,
        userModified: behaviorCheckResult.userModified ?? false
      },
      behaviorGuard,
      messageEnvelope
    );
    for await (const toolCallResult of toolCallIterator) {
      switch (toolCallResult.type) {
        case "result": {
          const durationMs = Date.now() - startTime;
          // Report success event
          logTelemetryEventIfEnabled("tengu_tool_use_success", {
            messageID: messageEnvelope.message.id,
            toolName: toolDefinition.name,
            isMcp: toolDefinition.isMcp ?? false,
            durationMs
          });
          // Analytics event
          SK("tool_result", {
            tool_name: toolDefinition.name,
            success: "true",
            duration_ms: String(durationMs)
          });
          // Yield result block
          yield createUserMessageObject({
            content: [toolDefinition.mapToolResultToToolResultBlockParam(toolCallResult.data, toolUseId)],
            toolUseResult: toolCallResult.data
          });
          break;
        }
        case "progress": {
          // Report progress event
          logTelemetryEventIfEnabled("tengu_tool_use_progress", {
            messageID: messageEnvelope.message.id,
            toolName: toolDefinition.name,
            isMcp: toolDefinition.isMcp ?? false
          });
          // Yield progress block
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
    // Only report error if not a known KG or $M error
    if (!(error instanceof KG)) {
      if (!(error instanceof $M)) {
        reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
      }
      logTelemetryEventIfEnabled("tengu_tool_use_error", {
        messageID: messageEnvelope.message.id,
        toolName: toolDefinition.name,
        isMcp: toolDefinition.isMcp ?? false
      });
      SK("tool_result", {
        tool_name: toolDefinition.name,
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

module.exports = handleToolUseWithValidationAndReporting;