/**
 * useToolPermissionAndLogResponse
 *
 * React hook that, when dependencies change, logs a tool permission request event and then logs a response event with language and platform metadata.
 *
 * @param {Object} toolContext - Contains assistant message and tool information.
 * @param {Object} completionConfig - Contains completion type and language name for the response event.
 * @returns {void}
 */
function useToolPermissionAndLogResponse(toolContext, completionConfig) {
  operateWithLeadingTrailing$2.useEffect(() => {
    // Log the tool permission request event
    logTelemetryEventIfEnabled("tengu_tool_use_show_permission_request", {
      messageID: toolContext.assistantMessage.message.id,
      toolName: toolContext.tool.name,
      isMcp: toolContext.tool.isMcp ?? false
    });

    // Resolve the language name and then log the response event
    Promise.resolve(completionConfig.language_name).then(resolvedLanguageName => {
      u5({
        completion_type: completionConfig.completion_type,
        event: "response",
        metadata: {
          language_name: resolvedLanguageName,
          message_id: toolContext.assistantMessage.message.id,
          platform: pA.platform
        }
      });
    });
  }, [toolContext, completionConfig]);
}

module.exports = useToolPermissionAndLogResponse;