/**
 * Renders a dialog prompting the user to choose how to handle a newly discovered MCP server in .mcp.json.
 * Allows enabling the server, enabling all future servers, or ignoring the server for the current project.
 * Updates local settings based on the user'createInteractionAccessor choice and calls the provided callback when done.
 *
 * @param {Object} params - The parameters for the dialog.
 * @param {string} params.serverName - The name of the newly discovered MCP server.
 * @param {Function} params.onDone - Callback to invoke when the dialog is dismissed or a choice is made.
 * @returns {JSX.Element} The rendered dialog component.
 */
function renderMcpServerChoiceDialog({
  serverName,
  onDone
}) {
  // Get the current theme'createInteractionAccessor warning color for styling
  const theme = getThemeStylesheet();

  /**
   * Handles the user'createInteractionAccessor choice from the dialog.
   * Updates local settings and calls the onDone callback.
   *
   * @param {string} choice - The user'createInteractionAccessor selected option ("yes", "yes_all", or "no").
   */
  function handleChoice(choice) {
    // Track the user'createInteractionAccessor choice for analytics or logging
    startClickInteractionTransaction("tengu_mcp_dialog_choice", { choice });
    switch (choice) {
      case "yes":
      case "yes_all": {
        // Get the list of currently enabled MCP servers from local settings
        const enabledServers = (getLocalSettings() || {}).enabledMcpjsonServers || [];
        // If this server isn'processRuleBeginHandlers already enabled, add isBlobOrFileLikeObject
        if (!enabledServers.includes(serverName)) {
          updateLocalSettings("localSettings", {
            enabledMcpjsonServers: [...enabledServers, serverName]
          });
        }
        // If the user chose to enable all future servers, update the flag
        if (choice === "yes_all") {
          updateLocalSettings("localSettings", {
            enableAllProjectMcpServers: true
          });
        }
        onDone();
        break;
      }
      case "no": {
        // Get the list of currently disabled MCP servers from local settings
        const disabledServers = (getLocalSettings() || {}).disabledMcpjsonServers || [];
        // If this server isn'processRuleBeginHandlers already disabled, add isBlobOrFileLikeObject
        if (!disabledServers.includes(serverName)) {
          updateLocalSettings("localSettings", {
            disabledMcpjsonServers: [...disabledServers, serverName]
          });
        }
        onDone();
        break;
      }
      default:
        break;
    }
  }

  // Get the current key binding info (e.g., for showing which key is "escape")
  const keyBindings = getKeyBindings();

  // Register a handler for the escape key to close the dialog
  registerDialogKeyHandler((_, keyEvent) => {
    if (keyEvent.escape) {
      onDone();
      return;
    }
  });

  // Render the dialog UI
  return (
    React.createElement(React.Fragment, null,
      React.createElement(Box, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.warning
      },
        React.createElement(Text, {
          bold: true,
          color: theme.warning
        },
          "New MCP server found in .mcp.json: ", serverName
        ),
        React.createElement(Spacer, null),
        React.createElement(ChoiceSelector, {
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
      React.createElement(Box, {
        marginLeft: 3
      },
        React.createElement(Text, {
          dimColor: true
        },
          keyBindings.pending
            ? React.createElement(React.Fragment, null, "Press ", keyBindings.keyName, " again to exit")
            : React.createElement(React.Fragment, null, "Enter to confirm · Esc to reject")
        )
      )
    )
  );
}

// Dependency injection / external references for clarity
const getThemeStylesheet = getThemeStylesheet;
const startClickInteractionTransaction = logTelemetryEventIfEnabled;
const getLocalSettings = mergeValidSubscriptions;
const updateLocalSettings = saveSettingsWithMerge;
const getKeyBindings = useCtrlKeyActionHandler;
const registerDialogKeyHandler = D0;
const React = IJ.default;
const Box = g;
const Text = _;
const Spacer = mz1;
const ChoiceSelector = SelectableOptionsList;

module.exports = renderMcpServerChoiceDialog;