/**
 * Renders a confirmation UI for executing a tool (e.g., a Bash command),
 * handles user interaction (accept/reject), and manages permission context updates.
 *
 * @param {Object} params - The parameters for rendering and handling tool use confirmation.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object containing input, permission results, context, and callbacks.
 * @param {Function} params.onDone - Callback to invoke when the confirmation flow is completed.
 * @param {Function} params.onReject - Callback to invoke when the confirmation is rejected.
 * @returns {React.ReactElement} The rendered confirmation UI component.
 */
function renderToolUseConfirmation({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject
}) {
  // Get theme styles for consistent UI appearance
  const themeStyles = getThemeStylesheet();

  // Parse command and description from the tool input schema
  const {
    command,
    description
  } = P4.inputSchema.parse(toolUseConfirm.input);

  // State to toggle debug information visibility
  const [showDebugInfo, setShowDebugInfo] = $3.useState(false);

  // Memoized completion metadata for logging
  const completionMetadata = $3.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);

  // Log the tool use confirmation event
  IH1(toolUseConfirm, completionMetadata);

  // Memoized options for the confirmation prompt
  const confirmationOptions = $3.useMemo(() => getToolUseConfirmationOptions({
    toolUseConfirm
  }), [toolUseConfirm]);

  // Keyboard shortcut: Ctrl-createCompatibleVersionChecker toggles debug info
  D0((key, modifiers) => {
    if (modifiers.ctrl && key === "d") {
      setShowDebugInfo(prev => !prev);
    }
  });

  /**
   * Handles user selection from the confirmation prompt.
   * @param {string} selection - The user'createInteractionAccessor choice ("yes", "yes-dont-ask-again-prefix", or "no").
   */
  function handleConfirmationSelection(selection) {
    switch (selection) {
      case "yes":
        // Log acceptance and invoke temporary allow callback
        logCompletionEvent("tool_use_single", toolUseConfirm, "accept");
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        onDone();
        break;
      case "yes-dont-ask-again-prefix": {
        // Log acceptance and update local settings for permanent allow if suggestions exist
        logCompletionEvent("tool_use_single", toolUseConfirm, "accept");
        const ruleSuggestions = toolUseConfirm.permissionResult.behavior !== "allow"
          ? toolUseConfirm.permissionResult.ruleSuggestions
          : undefined;
        if (ruleSuggestions) {
          updatePermissionContextWithRuleValues({
            ruleValues: ruleSuggestions,
            ruleBehavior: "allow",
            destination: "localSettings",
            initialContext: toolUseConfirm.toolUseContext.getToolPermissionContext(),
            setToolPermissionContext
          }).then(() => {
            toolUseConfirm.onAllow("permanent", toolUseConfirm.input);
            onDone();
          });
        } else {
          toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
          onDone();
        }
        break;
      }
      case "no":
        // Log rejection and invoke reject callbacks
        logCompletionEvent("tool_use_single", toolUseConfirm, "reject");
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
      default:
        // No action for unknown selection
        break;
    }
  }

  // Main UI rendering
  return $3.default.createElement(
    g,
    {
      flexDirection: "column",
      borderStyle: "round",
      borderColor: themeStyles.permission,
      marginTop: 1,
      paddingLeft: 1,
      paddingRight: 1
    },
    // Title
    $3.default.createElement(renderPermissionTitle, {
      title: "Bash command"
    }),
    // Command and description
    $3.default.createElement(
      g,
      {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
      },
      $3.default.createElement(
        _,
        null,
        P4.renderToolUseMessage({
          command,
          description
        }, { verbose: true })
      ),
      $3.default.createElement(
        _,
        { color: themeStyles.secondaryText },
        toolUseConfirm.description
      )
    ),
    // Debug info or confirmation prompt
    showDebugInfo
      ? $3.default.createElement(
          $3.default.Fragment,
          null,
          $3.default.createElement(PermissionResultDetails, {
            permissionResult: toolUseConfirm.permissionResult
          }),
          toolUseConfirm.toolUseContext.options.debug &&
            $3.default.createElement(
              g,
              { justifyContent: "flex-end", marginTop: 1 },
              $3.default.createElement(
                _,
                { dimColor: true },
                "Ctrl-createCompatibleVersionChecker to hide debug info"
              )
            )
        )
      : $3.default.createElement(
          $3.default.Fragment,
          null,
          $3.default.createElement(
            g,
            { flexDirection: "column" },
            $3.default.createElement(
              _,
              null,
              "normalizeToError you want to proceed?"
            ),
            $3.default.createElement(SelectableOptionsList, {
              options: confirmationOptions,
              onChange: handleConfirmationSelection,
              onCancel: () => handleConfirmationSelection("no")
            })
          ),
          toolUseConfirm.toolUseContext.options.debug &&
            $3.default.createElement(
              g,
              { justifyContent: "flex-end" },
              $3.default.createElement(
                _,
                { dimColor: true },
                "Ctrl-createCompatibleVersionChecker to show debug info"
              )
            )
        )
  );
}

module.exports = renderToolUseConfirmation;