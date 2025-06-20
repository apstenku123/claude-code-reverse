/**
 * Displays a trust dialog to the user, asking if they trust the files in the current folder.
 * Handles user responses, updates local settings, and logs analytics events.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onDone - Callback invoked when the dialog is completed.
 * @returns {React.Element} The rendered trust dialog component.
 */
function TrustDialog({ onDone }) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();
  // Get MCP server map (object of MCP servers in this project)
  const mcpServers = rU();
  // Whether this project has any MCP servers defined
  const hasMcpServers = Object.keys(mcpServers).length > 0;

  // Show analytics event when dialog is shown
  hI.default.useEffect(() => {
    const isHomeDirectory = V_2() === iA();
    logTelemetryEventIfEnabled("trust_dialog_shown", {
      isHomeDir: isHomeDirectory,
      hasMcpServers
    });
  }, [hasMcpServers]);

  /**
   * Handles the user'createInteractionAccessor response to the trust dialog.
   * @param {string} userChoice - The user'createInteractionAccessor selection value.
   */
  function handleUserChoice(userChoice) {
    const currentSettings = getProjectSubscriptionConfig();
    if (userChoice === "no") {
      // User chose to exit
      Q7(1);
      return;
    }
    const enableMcp = userChoice === "yes_enable_mcp";
    const isHomeDirectory = V_2() === iA();

    // Log analytics event for acceptance
    logTelemetryEventIfEnabled("trust_dialog_accept", {
      isHomeDir: isHomeDirectory,
      hasMcpServers,
      enableMcp
    });

    if (hasMcpServers) {
      // Update local settings for MCP servers
      if (enableMcp) {
        saveSettingsWithMerge("localSettings", {
          enabledMcpjsonServers: Object.keys(mcpServers),
          enableAllProjectMcpServers: true
        });
      } else {
        saveSettingsWithMerge("localSettings", {
          disabledMcpjsonServers: Object.keys(mcpServers)
        });
      }
      // Mark trust dialog as accepted if not in home directory
      if (!isHomeDirectory) {
        updateProjectInConfig({
          ...currentSettings,
          hasTrustDialogAccepted: true
        });
      }
    } else if (!isHomeDirectory) {
      // No MCP servers, just mark trust dialog as accepted
      updateProjectInConfig({
        ...currentSettings,
        hasTrustDialogAccepted: true
      });
    }
    // Call the completion callback
    onDone();
  }

  // Get keyboard shortcut info for the dialog
  const keyboardInfo = useCtrlKeyActionHandler();

  // Register keyboard handler for escape key
  D0((_, keyState) => {
    if (keyState.escape) {
      Q7(0);
      return;
    }
  });

  // Render the dialog UI
  return hI.default.createElement(
    hI.default.Fragment,
    null,
    hI.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.warning
      },
      hI.default.createElement(
        _,
        { bold: true, color: theme.warning },
        "normalizeToError you trust the files in this folder?"
      ),
      hI.default.createElement(
        _,
        { bold: true },
        f1().cwd()
      ),
      hI.default.createElement(
        g,
        { flexDirection: "column", gap: 1 },
        hI.default.createElement(
          _,
          null,
          m0,
          " may read files in this folder. Reading untrusted files may lead ",
          m0,
          " to behave in an unexpected ways."
        ),
        hI.default.createElement(
          _,
          null,
          "With your permission ",
          m0,
          " may execute files in this folder.",
          hasMcpServers &&
            " This project also contains MCP servers defined in .mcp.json that can execute code on your machine if enabled.",
          " ",
          "Executing untrusted code is unsafe."
        ),
        hI.default.createElement(renderLinkOrText, {
          url: "https://docs.anthropic.com/createInteractionAccessor/claude-code-security"
        })
      ),
      hI.default.createElement(SelectableOptionsList, {
        options: hasMcpServers
          ? [
              {
                label: "Yes, proceed with MCP servers enabled",
                value: "yes_enable_mcp"
              },
              {
                label: "Yes, proceed with MCP servers disabled",
                value: "yes_disable_mcp"
              },
              {
                label: "No, exit",
                value: "no"
              }
            ]
          : [
              {
                label: "Yes, proceed",
                value: "yes_enable_mcp"
              },
              {
                label: "No, exit",
                value: "no"
              }
            ],
        onChange: handleUserChoice,
        onCancel: () => handleUserChoice("no")
      })
    ),
    hI.default.createElement(
      g,
      { marginLeft: 3 },
      hI.default.createElement(
        _,
        { dimColor: true },
        keyboardInfo.pending
          ? hI.default.createElement(
              hI.default.Fragment,
              null,
              "Press ",
              keyboardInfo.keyName,
              " again to exit"
            )
          : hI.default.createElement(
              hI.default.Fragment,
              null,
              "Enter to confirm · Esc to exit"
            )
      )
    )
  );
}

module.exports = TrustDialog;