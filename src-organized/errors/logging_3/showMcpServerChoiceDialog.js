/**
 * Displays a dialog prompting the user to choose how to handle a newly discovered MCP server in .mcp.json.
 * Updates local settings based on the user'createInteractionAccessor choice and calls the provided callback when done.
 *
 * @param {Object} params - The parameters for the dialog.
 * @param {string} params.serverName - The name of the newly discovered MCP server.
 * @param {Function} params.onDone - Callback to invoke when the dialog is dismissed or a choice is made.
 * @returns {JSX.Element} The rendered dialog component.
 */
function showMcpServerChoiceDialog({
  serverName,
  onDone
}) {
  // Get the current theme'createInteractionAccessor warning color
  const theme = getThemeStylesheet();

  /**
   * Handles the user'createInteractionAccessor choice from the dialog.
   * @param {string} choice - The user'createInteractionAccessor selection ('yes', 'yes_all', or 'no').
   */
  function handleChoice(choice) {
    // Log the user'createInteractionAccessor choice for analytics or tracking
    logTelemetryEventIfEnabled("tengu_mcp_dialog_choice", { choice });

    switch (choice) {
      case "yes":
      case "yes_all": {
        // Get the list of currently enabled MCP servers from local settings
        const enabledServers = (mergeValidSubscriptions() || {}).enabledMcpjsonServers || [];
        // Add the new server if isBlobOrFileLikeObject'createInteractionAccessor not already enabled
        if (!enabledServers.includes(serverName)) {
          saveSettingsWithMerge("localSettings", {
            enabledMcpjsonServers: [...enabledServers, serverName]
          });
        }
        // If the user chose to enable all future servers, update the flag
        if (choice === "yes_all") {
          saveSettingsWithMerge("localSettings", {
            enableAllProjectMcpServers: true
          });
        }
        onDone();
        break;
      }
      case "no": {
        // Get the list of currently disabled MCP servers from local settings
        const disabledServers = (mergeValidSubscriptions() || {}).disabledMcpjsonServers || [];
        // Add the new server to the disabled list if not already present
        if (!disabledServers.includes(serverName)) {
          saveSettingsWithMerge("localSettings", {
            disabledMcpjsonServers: [...disabledServers, serverName]
          });
        }
        onDone();
        break;
      }
      default:
        // No action for other choices
        break;
    }
  }

  // Get key binding and pending state for UI hints
  const keyBinding = useCtrlKeyActionHandler();

  // Register a handler for escape key to dismiss the dialog
  D0((_, input) => {
    if (input.escape) {
      onDone();
      return;
    }
  });

  // Render the dialog UI
  return IJ.default.createElement(
    IJ.default.Fragment,
    null,
    IJ.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.warning
      },
      IJ.default.createElement(
        _,
        { bold: true, color: theme.warning },
        "New MCP server found in .mcp.json: ",
        serverName
      ),
      IJ.default.createElement(mz1, null),
      IJ.default.createElement(SelectableOptionsList, {
        options: [
          {
            label: "Use this and all future MCP servers in this project",
            value: "yes_all"
          },
          {
            label: "Use this MCP server",
            value: "yes"
          },
          {
            label: "Continue without using this MCP server",
            value: "no"
          }
        ],
        onChange: selectedValue => handleChoice(selectedValue),
        onCancel: () => handleChoice("no")
      })
    ),
    IJ.default.createElement(
      g,
      { marginLeft: 3 },
      IJ.default.createElement(
        _,
        { dimColor: true },
        keyBinding.pending
          ? IJ.default.createElement(
              IJ.default.Fragment,
              null,
              "Press ",
              keyBinding.keyName,
              " again to exit"
            )
          : IJ.default.createElement(
              IJ.default.Fragment,
              null,
              "Enter to confirm · Esc to reject"
            )
      )
    )
  );
}

module.exports = showMcpServerChoiceDialog;