/**
 * Renders a permission prompt for tool usage, handling user responses and updating tool permission context.
 *
 * @param {Object} props - The properties for the ToolPermissionPrompt component.
 * @param {Function} props.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} props.toolUseConfirm - Object containing tool usage confirmation details and callbacks.
 * @param {Function} props.onDone - Callback to invoke when the prompt is completed.
 * @param {Function} props.onReject - Callback to invoke when the prompt is rejected.
 * @param {boolean} props.verbose - Whether to render the tool use message in verbose mode.
 * @returns {React.ReactElement} The rendered permission prompt component.
 */
function ToolPermissionPrompt({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject,
  verbose
}) {
  // Get theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet();

  // Get the user-facing name for the tool input
  const userFacingToolName = toolUseConfirm.tool.userFacingName(toolUseConfirm.input);

  // Remove ' (MCP)' suffix if present for display
  const displayToolName = userFacingToolName.endsWith(" (MCP)")
    ? userFacingToolName.slice(0, -6)
    : userFacingToolName;

  // Memoized metadata for logging tool permission requests
  const toolPermissionRequestMetadata = React.useMemo(
    () => ({
      completion_type: "tool_use_single",
      language_name: "none"
    }),
    []
  );

  // Log the tool permission request
  useToolPermissionRequestLogger(toolUseConfirm, toolPermissionRequestMetadata);

  /**
   * Handles the user'createInteractionAccessor response to the permission prompt.
   * @param {string} response - The user'createInteractionAccessor response value.
   */
  const handleUserResponse = (response) => {
    switch (response) {
      case "yes":
        // Log acceptance event
        logToolPermissionEvent({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: platformInfo.platform
          }
        });
        // Allow tool use temporarily
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        // Invoke completion callback
        onDone();
        break;
      case "yes-dont-ask-again":
        // Log acceptance event
        logToolPermissionEvent({
          completion_type: "tool_use_single",
          event: "accept",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: platformInfo.platform
          }
        });
        // Set a permanent allow rule and update context
        setToolPermissionRule({
          rule: {
            ruleBehavior: "allow",
            ruleValue: {
              toolName: toolUseConfirm.tool.name
            },
            source: "localSettings"
          },
          initialContext: toolUseConfirm.toolUseContext.getToolPermissionContext(),
          setToolPermissionContext
        }).then(() => {
          // Allow tool use permanently
          toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
          // Invoke completion callback
          onDone();
        });
        break;
      case "no":
        // Log rejection event
        logToolPermissionEvent({
          completion_type: "tool_use_single",
          event: "reject",
          metadata: {
            language_name: "none",
            message_id: toolUseConfirm.assistantMessage.message.id,
            platform: platformInfo.platform
          }
        });
        // Reject tool use
        toolUseConfirm.onReject();
        // Invoke rejection and completion callbacks
        onReject();
        onDone();
        break;
      default:
        // No action for unknown responses
        break;
    }
  };

  // Get the current language/environment name for display
  const languageName = getCurrentLanguageName();

  // Memoized options for the permission prompt
  const permissionOptions = React.useMemo(
    () => [
      {
        label: "Yes",
        value: "yes"
      },
      {
        label: `Yes, and don'processRuleBeginHandlers ask again for ${formatAnsiBold(displayToolName)} commands in ${formatAnsiBold(languageName)}`,
        value: "yes-dont-ask-again"
      },
      {
        label: `No, and tell Claude what to do differently (${formatAnsiBoldAnsi256(getThemeStylesheet().secondaryText)("esc")})`,
        value: "no"
      }
    ],
    [displayToolName, languageName]
  );

  // Render the permission prompt UI
  return React.createElement(
    FlexBox,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: getThemeStylesheet().permission,
      marginTop: 1,
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 1
    },
    React.createElement(TitleBar, {
      title: "Tool use"
    }),
    React.createElement(
      FlexBox,
      {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
      },
      React.createElement(
        Text,
        null,
        displayToolName,
        "(",
        toolUseConfirm.tool.renderToolUseMessage(toolUseConfirm.input, { verbose }),
        ")",
        userFacingToolName.endsWith(" (MCP)")
          ? React.createElement(Text, { color: themeStyles.secondaryText }, " (MCP)")
          : ""
      ),
      React.createElement(
        Text,
        { color: themeStyles.secondaryText },
        toolUseConfirm.description
      )
    ),
    React.createElement(
      FlexBox,
      { flexDirection: "column" },
      React.createElement(Text, null, "normalizeToError you want to proceed?"),
      React.createElement(PermissionOptions, {
        options: permissionOptions,
        onChange: handleUserResponse,
        onCancel: () => handleUserResponse("no")
      })
    )
  );
}

module.exports = ToolPermissionPrompt;