/**
 * Renders a permission prompt for executing a tool (e.g., Bash command),
 * allowing the user to accept, reject, or permanently allow the action.
 * Handles debug info toggling and updates tool permission context as needed.
 *
 * @param {Object} params - The parameters for the permission prompt.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Object} params.toolUseConfirm - The tool use confirmation object containing input, description, permission result, etc.
 * @param {Function} params.onDone - Callback invoked when the prompt is completed (accepted or rejected).
 * @param {Function} params.onReject - Callback invoked specifically on rejection.
 * @returns {React.ReactElement} The rendered permission prompt component.
 */
function renderToolUsePermissionPrompt({
  setToolPermissionContext,
  toolUseConfirm,
  onDone,
  onReject
}) {
  // Get theme colors/styles
  const themeStyles = getThemeStylesheet();

  // Parse command and description from tool input schema
  const {
    command,
    description
  } = P4.inputSchema.parse(toolUseConfirm.input);

  // State: show/hide debug info
  const [showDebugInfo, setShowDebugInfo] = $3.useState(false);

  // Memoized context for tool use completion
  const toolUseCompletionContext = $3.useMemo(() => ({
    completion_type: "tool_use_single",
    language_name: "none"
  }), []);

  // Register tool use context for analytics/telemetry
  IH1(toolUseConfirm, toolUseCompletionContext);

  // Memoized options for the prompt (e.g., yes/no/yes-don'processRuleBeginHandlers-ask-again)
  const promptOptions = $3.useMemo(() => getToolUseConfirmationOptions({
    toolUseConfirm
  }), [toolUseConfirm]);

  // Keyboard shortcut: Ctrl-createCompatibleVersionChecker toggles debug info
  D0((key, modifiers) => {
    if (modifiers.ctrl && key === "d") {
      setShowDebugInfo(prev => !prev);
    }
  });

  /**
   * Handles user selection from the prompt.
   * @param {string} option - The selected option ("yes", "yes-dont-ask-again-prefix", or "no").
   */
  function handlePromptChange(option) {
    switch (option) {
      case "yes":
        // Accept tool use for this session only
        xO("tool_use_single", toolUseConfirm, "accept");
        toolUseConfirm.onAllow("temporary", toolUseConfirm.input);
        onDone();
        break;
      case "yes-dont-ask-again-prefix": {
        // Accept and update local settings for permanent allow if possible
        xO("tool_use_single", toolUseConfirm, "accept");
        const ruleSuggestions = toolUseConfirm.permissionResult.behavior !== "allow"
          ? toolUseConfirm.permissionResult.ruleSuggestions
          : undefined;
        if (ruleSuggestions) {
          // Save rule suggestions to local settings and update context
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
        // Reject tool use
        xO("tool_use_single", toolUseConfirm, "reject");
        toolUseConfirm.onReject();
        onReject();
        onDone();
        break;
      default:
        // No action for unknown options
        break;
    }
  }

  // Render the permission prompt UI
  return $3.default.createElement(g, {
    flexDirection: "column",
    borderStyle: "round",
    borderColor: themeStyles.permission,
    marginTop: 1,
    paddingLeft: 1,
    paddingRight: 1
  },
    $3.default.createElement(renderPermissionTitle, {
      title: "Bash command"
    }),
    $3.default.createElement(g, {
      flexDirection: "column",
      paddingX: 2,
      paddingY: 1
    },
      $3.default.createElement(_, null, P4.renderToolUseMessage({
        command,
        description
      }, {
        verbose: true
      })),
      $3.default.createElement(_, {
        color: themeStyles.secondaryText
      }, toolUseConfirm.description)
    ),
    showDebugInfo
      ? $3.default.createElement($3.default.Fragment, null,
          $3.default.createElement(PermissionResultDetails, {
            permissionResult: toolUseConfirm.permissionResult
          }),
          toolUseConfirm.toolUseContext.options.debug &&
            $3.default.createElement(g, {
              justifyContent: "flex-end",
              marginTop: 1
            },
              $3.default.createElement(_, {
                dimColor: true
              }, "Ctrl-createCompatibleVersionChecker to hide debug info")
            )
        )
      : $3.default.createElement($3.default.Fragment, null,
          $3.default.createElement(g, {
            flexDirection: "column"
          },
            $3.default.createElement(_, null, "normalizeToError you want to proceed?"),
            $3.default.createElement(SelectableOptionsList, {
              options: promptOptions,
              onChange: handlePromptChange,
              onCancel: () => handlePromptChange("no")
            })
          ),
          toolUseConfirm.toolUseContext.options.debug &&
            $3.default.createElement(g, {
              justifyContent: "flex-end"
            },
              $3.default.createElement(_, {
                dimColor: true
              }, "Ctrl-createCompatibleVersionChecker to show debug info")
            )
        )
  );
}

module.exports = renderToolUsePermissionPrompt;