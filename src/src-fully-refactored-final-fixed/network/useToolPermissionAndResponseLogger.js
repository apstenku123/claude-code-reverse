/**
 * React hook that logs a tool permission request event and sends a response event with metadata.
 *
 * @param {Object} toolUsageContext - Context containing assistant message and tool information.
 * @param {Object} responseConfig - Configuration object for the response event.
 * @returns {void}
 */
function useToolPermissionAndResponseLogger(toolUsageContext, responseConfig) {
  // Import React'createInteractionAccessor useEffect from the external module
  const { useEffect } = processWithTransformedObservable$2;

  useEffect(() => {
    // Log the tool permission request event
    logTelemetryEventIfEnabled("tengu_tool_use_show_permission_request", {
      messageID: toolUsageContext.assistantMessage.message.id,
      toolName: toolUsageContext.tool.name
    });

    // Send a response event with completion type and metadata
    u5({
      completion_type: responseConfig.completion_type,
      event: "response",
      metadata: {
        language_name: responseConfig.language_name,
        message_id: toolUsageContext.assistantMessage.message.id,
        platform: pA.platform
      }
    });
  }, [toolUsageContext, responseConfig]);
}

module.exports = useToolPermissionAndResponseLogger;