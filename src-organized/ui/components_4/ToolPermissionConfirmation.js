/**
 * Renders a confirmation UI for tool permission requests, handling user responses and logging events.
 *
 * @param {Object} params - The parameters for the confirmation component.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object containing tool, input, and callbacks.
 * @param {Function} params.onDone - Callback to invoke when the confirmation process is complete.
 * @param {Function} params.onReject - Callback to invoke when the user rejects the request.
 * @param {boolean} params.verbose - Whether to show verbose tool messages.
 * @param {Function} params.setToolPermissionContext - Setter for the tool permission context.
 * @param {Object} params.toolUseContext - Context object for tool permission management.
 * @returns {React.ReactElement} The rendered confirmation component.
 */
function ToolPermissionConfirmation({
  toolUseConfirm,
  onDone,
  onReject,
  verbose,
  setToolPermissionContext,
  toolUseContext
}) {
  // Get the tool input (e.g., file(createInteractionAccessor))
  const toolInput = getInputPathFromTool(toolUseConfirm);

  // Get the user-facing name for the tool
  const toolDisplayName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Determine if the tool is read-only or editable
  const {
    toolType,
    userFacingReadOrEdit
  } = toolUseConfirm.tool.isReadOnly(toolUseConfirm.input)
    ? { toolType: "read", userFacingReadOrEdit: "Read" }
    : { toolType: "edit", userFacingReadOrEdit: "Edit" };

  // Title for the confirmation dialog (e.g., "Read file" or "Edit files")
  const confirmationTitle = `${userFacingReadOrEdit} ${toolInput && WF5(toolInput) ? "files" : "file"}`;

  // Memoized event metadata for logging
  const eventMetadata = JC.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);

  // Log the tool permission request
  FC(toolUseConfirm, eventMetadata);

  // Memoized options for the confirmation dialog
  const confirmationOptions = JC.useMemo(() => {
    const permissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
    return getUserConfirmationOptions(toolInput, toolType, permissionContext);
  }, [toolInput, toolType, toolUseConfirm]);

  /**
   * Handles user selection in the confirmation dialog.
   * @param {string} selectedOption - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   */
  function handleUserResponse(selectedOption) {
    switch (selectedOption) {
      case "yes":
        // Log acceptance event
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Allow tool use temporarily
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        onDone();
        break;
      case "yes-dont-ask-again": {
        // Log acceptance event with 'don'processRuleBeginHandlers ask again'
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Save permanent permission if tool input exists
        const permissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        if (toolInput !== null) {
          updateSubscriptionWithModeAndDirectories(toolInput, toolType, permissionContext, setToolPermissionContext);
        }
        // Allow tool use permanently
        toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
        onDone();
        break;
      }
      case "no":
        // Log rejection event
        u5({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Trigger rejection callbacks
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
      default:
        // No action for unknown option
        break;
    }
  }

  // If there is no tool input, render the fallback component
  if (!toolInput) {
    return JC.default.createElement(ToolUsePermissionPrompt, {
      setToolPermissionContext,
      toolUseConfirm,
      toolUseContext,
      onDone,
      onReject,
      verbose
    });
  }

  // Render the main confirmation UI
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
    JC.default.createElement(renderPermissionTitle, { title: confirmationTitle }),
    JC.default.createElement(
      g,
      {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
      },
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
        options: confirmationOptions,
        onChange: handleUserResponse,
        onCancel: () => handleUserResponse("no")
      })
    )
  );
}

module.exports = ToolPermissionConfirmation;