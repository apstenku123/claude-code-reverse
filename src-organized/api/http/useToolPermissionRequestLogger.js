/**
 * React hook that logs a tool permission request event and sends a response event with metadata.
 *
 * @param {Object} toolPermissionContext - Context containing assistant message and tool information.
 * @param {Object} responseConfig - Configuration object containing completion type and language metadata.
 * @returns {void}
 */
function useToolPermissionRequestLogger(toolPermissionContext, responseConfig) {
  // Import React'createInteractionAccessor useEffect from the external module
  processWithTransformedObservable$2.useEffect(() => {
    // Log the permission request event for analytics or tracking
    logTelemetryEventIfEnabled("tengu_tool_use_show_permission_request", {
      messageID: toolPermissionContext.assistantMessage.message.id,
      toolName: toolPermissionContext.tool.name
    });

    // Send a response event with relevant metadata
    u5({
      completion_type: responseConfig.completion_type,
      event: "response",
      metadata: {
        language_name: responseConfig.language_name,
        message_id: toolPermissionContext.assistantMessage.message.id,
        platform: pA.platform
      }
    });
  }, [toolPermissionContext, responseConfig]);
}

module.exports = useToolPermissionRequestLogger;