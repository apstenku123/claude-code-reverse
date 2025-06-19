/**
 * Renders a confirmation dialog for tool usage, handling user permissions and responses.
 *
 * @param {Object} params - The parameters for rendering the dialog.
 * @param {Object} params.toolUseConfirm - The tool usage confirmation object, containing tool and input info.
 * @param {Function} params.onDone - Callback to invoke when the dialog is completed.
 * @param {Function} params.onReject - Callback to invoke when the tool usage is rejected.
 * @param {boolean} params.verbose - Whether to show verbose tool usage information.
 * @param {Function} params.setToolPermissionContext - Function to set the tool permission context.
 * @param {Object} params.toolUseContext - The context object for tool usage permissions.
 * @returns {React.Element} The rendered confirmation dialog React element.
 */
function renderToolUseConfirmationDialog({
  toolUseConfirm,
  onDone,
  onReject,
  verbose,
  setToolPermissionContext,
  toolUseContext
}) {
  // Get the tool input (e.g., file(createInteractionAccessor) or data) from the confirmation object
  const toolInput = getInputPathFromTool(toolUseConfirm);

  // Get the user-facing name of the tool for the given input
  const toolDisplayName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Determine if the tool is read-only or editable, and set display strings accordingly
  const {
    toolType,
    userFacingReadOrEdit
  } = toolUseConfirm.tool.isReadOnly(toolUseConfirm.input)
    ? { toolType: "read", userFacingReadOrEdit: "Read" }
    : { toolType: "edit", userFacingReadOrEdit: "Edit" };

  // Determine whether to use singular or plural for file(createInteractionAccessor)
  const fileLabel = `${userFacingReadOrEdit} ${toolInput && WF5(toolInput) ? "files" : "file"}`;

  // Memoized analytics context for this dialog
  const analyticsContext = JC.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);

  // Track the tool usage event for analytics
  FC(toolUseConfirm, analyticsContext);

  // Memoized list of permission options for the dialog
  const permissionOptions = JC.useMemo(() => {
    const currentPermissionContext = toolUseConfirm.toolUseContext.getToolPermissionContext();
    return getUserConfirmationOptions(toolInput, toolType, currentPermissionContext);
  }, [toolInput, toolType, toolUseConfirm]);

  /**
   * Handles the user'createInteractionAccessor response to the confirmation dialog.
   * @param {string} userChoice - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again", or "no").
   */
  function handleUserChoice(userChoice) {
    switch (userChoice) {
      case "yes":
        // User accepted tool usage for this time only
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
        // User accepted and wants to remember this decision
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
        if (toolInput !== null) {
          updateSubscriptionWithModeAndDirectories(toolInput, toolType, currentPermissionContext, setToolPermissionContext);
        }
        toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
        onDone();
        break;
      }
      case "no":
        // User rejected tool usage
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
        // normalizeToError nothing for unknown choices
        break;
    }
  }

  // If there is no tool input, render the fallback dialog
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

  // Render the main tool usage confirmation dialog
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
      title: fileLabel
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
        onChange: handleUserChoice,
        onCancel: () => handleUserChoice("no")
      })
    )
  );
}

module.exports = renderToolUseConfirmationDialog;