/**
 * Renders a permission prompt for tool usage, handling user confirmation, rejection, and permission context updates.
 *
 * @param {Object} params - The parameters for the permission prompt.
 * @param {Object} params.toolUseConfirm - The tool usage confirmation object containing tool info and callbacks.
 * @param {Function} params.onDone - Callback to invoke when the prompt is completed.
 * @param {Function} params.onReject - Callback to invoke when the prompt is rejected.
 * @param {boolean} params.verbose - Whether to render verbose tool messages.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseContext - The context object for tool usage permissions.
 * @returns {React.Element} The rendered permission prompt component.
 */
function ToolUsePermissionPrompt({
  toolUseConfirm,
  onDone,
  onReject,
  verbose,
  setToolPermissionContext,
  toolUseContext
}) {
  // Get the tool input (e.g., files or file) from the confirmation object
  const toolInput = getInputPathFromTool(toolUseConfirm);

  // Get the user-facing name for the tool
  const toolUserFacingName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Determine if the tool is read-only or editable
  const {
    toolType,
    userFacingReadOrEdit
  } = toolUseConfirm.tool.isReadOnly(toolUseConfirm.input)
    ? { toolType: "read", userFacingReadOrEdit: "Read" }
    : { toolType: "edit", userFacingReadOrEdit: "Edit" };

  // Compose the title for the prompt (e.g., "Read file" or "Edit files")
  const promptTitle = `${userFacingReadOrEdit} ${toolInput && WF5(toolInput) ? "files" : "file"}`;

  // Memoized analytics context for this prompt
  const analyticsContext = JC.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);

  // Log the tool use confirmation event
  FC(toolUseConfirm, analyticsContext);

  // Memoized options for the permission prompt (e.g., Yes, No, Don'processRuleBeginHandlers ask again)
  const permissionOptions = JC.useMemo(() => {
    const currentPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
    return getUserConfirmationOptions(toolInput, toolType, currentPermissionContext);
  }, [toolInput, toolType, toolUseConfirm]);

  /**
   * Handles the user'createInteractionAccessor response to the permission prompt.
   * @param {string} response - The user'createInteractionAccessor response ("yes", "yes-dont-ask-again", or "no").
   */
  function handlePermissionResponse(response) {
    switch (response) {
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
        // Log acceptance event with permanent permission
        u5({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: pA.platform
          }
        });
        // Update permission context for permanent allowance
        const currentPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
        if (toolInput !== null) {
          updateSubscriptionWithModeAndDirectories(toolInput, toolType, currentPermissionContext, setToolPermissionContext);
        }
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
        // Call rejection handlers
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
    }
  }

  // If there is no tool input, render the fallback permission context component
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

  // Render the main permission prompt UI
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
    JC.default.createElement(renderPermissionTitle, {
      title: promptTitle
    }),
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
        toolUserFacingName,
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