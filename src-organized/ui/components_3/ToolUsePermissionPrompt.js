/**
 * Displays a permission prompt for tool usage, handles user responses, and manages tool permission context.
 *
 * @param {Object} params - The parameters for the permission prompt.
 * @param {Object} params.toolUseConfirm - The tool usage confirmation object containing tool info and callbacks.
 * @param {Function} params.onDone - Callback to invoke when the prompt is completed.
 * @param {Function} params.onReject - Callback to invoke when the prompt is rejected.
 * @param {boolean} params.verbose - Whether to show verbose output in the tool message.
 * @param {Function} params.setToolPermissionContext - Setter for updating the tool permission context.
 * @param {Object} params.toolUseContext - The context object for tool permission management.
 * @returns {React.ReactElement} The rendered permission prompt component.
 */
function ToolUsePermissionPrompt({
  toolUseConfirm,
  onDone,
  onReject,
  verbose,
  setToolPermissionContext,
  toolUseContext
}) {
  // Extract the tool permission request (if any)
  const toolPermissionRequest = getInputPathFromTool(toolUseConfirm);

  // Get the user-facing name of the tool
  const toolDisplayName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Determine tool type and action (read/edit)
  const {
    toolType,
    userFacingReadOrEdit
  } = toolUseConfirm.tool.isReadOnly(toolUseConfirm.input)
    ? { toolType: "read", userFacingReadOrEdit: "Read" }
    : { toolType: "edit", userFacingReadOrEdit: "Edit" };

  // Construct the title for the permission prompt
  const promptTitle = `${userFacingReadOrEdit} ${toolPermissionRequest && WF5(toolPermissionRequest) ? "files" : "file"}`;

  // Memoize the logging metadata for the tool permission request
  const loggingMetadata = JC.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);

  // Log the tool permission request display
  FC(toolUseConfirm, loggingMetadata);

  // Memoize the options for the permission prompt (e.g., yes, no, don'processRuleBeginHandlers ask again)
  const permissionOptions = JC.useMemo(() => {
    const currentPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
    return getUserConfirmationOptions(toolPermissionRequest, toolType, currentPermissionContext);
  }, [toolPermissionRequest, toolType, toolUseConfirm]);

  /**
   * Handles the user'createInteractionAccessor response to the permission prompt.
   * @param {string} userChoice - The user'createInteractionAccessor selected option ("yes", "yes-dont-ask-again", or "no").
   */
  function handlePermissionResponse(userChoice) {
    switch (userChoice) {
      case "yes":
        // Log acceptance and allow tool use temporarily
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        onDone();
        break;
      case "yes-dont-ask-again": {
        // Log acceptance and allow tool use permanently
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        const currentPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        if (toolPermissionRequest !== null) {
          // Update the tool permission context for permanent allowance
          updateSubscriptionWithModeAndDirectories(toolPermissionRequest, toolType, currentPermissionContext, setToolPermissionContext);
        }
        toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
        onDone();
        break;
      }
      case "no":
        // Log rejection and invoke rejection callbacks
        u5({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
      default:
        // No action for unknown options
        break;
    }
  }

  // If there is no permission request, render the fallback component
  if (!toolPermissionRequest) {
    return JC.default.createElement(ToolUsePermissionPrompt, {
      setToolPermissionContext,
      toolUseConfirm,
      toolUseContext,
      onDone,
      onReject,
      verbose
    });
  }

  // Render the permission prompt UI
  return JC.default.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: getThemeStylesheet().permission,
      marginTop: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 1
    },
    JC.default.createElement(renderPermissionTitle, { title: promptTitle }),
    JC.default.createElement(
      g,
      { flexDirection: "column", paddingX: 2, paddingY: 1 },
      JC.default.createElement(
        _,
        null,
        toolDisplayName,
        "(",
        toolUseConfirm.tool.renderToolUseMessage(toolUseConfirm.input, { verbose }),
        ")"
      )
    ),
    JC.default.createElement(
      g,
      { flexDirection: "column" },
      JC.default.createElement(_, null, "normalizeToError you want to proceed?"),
      JC.default.createElement(SelectableOptionsList, {
        options: permissionOptions,
        onChange: handlePermissionResponse,
        onCancel: () => handlePermissionResponse("no")
      })
    )
  );
}

module.exports = ToolUsePermissionPrompt;