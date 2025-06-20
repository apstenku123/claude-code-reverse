/**
 * Displays a dialog for selecting which MCP servers (from .mcp.json) to enable or disable.
 * Updates local settings based on user selection or escape action.
 *
 * @param {Object} params - The parameters for the dialog.
 * @param {string[]} params.serverNames - List of new MCP server names found in .mcp.json.
 * @param {Function} params.onDone - Callback to invoke when the dialog is completed.
 * @returns {React.ReactElement} The rendered dialog component.
 */
function McpServerSelectionDialog({
  serverNames,
  onDone
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  /**
   * Handles submission of selected servers to enable/disable.
   * @param {string[]} selectedServers - The servers selected by the user to enable.
   */
  function handleSubmit(selectedServers) {
    // Get current enabled/disabled server lists from local settings
    const localSettings = mergeValidSubscriptions() || {};
    const enabledServers = localSettings.enabledMcpjsonServers || [];
    const disabledServers = localSettings.disabledMcpjsonServers || [];

    // Partition serverNames into approved (selected) and rejected (not selected)
    const [approvedServers, rejectedServers] = VE1(serverNames, name => selectedServers.includes(name));

    // Log the user'createInteractionAccessor choice for analytics/metrics
    logTelemetryEventIfEnabled("tengu_mcp_multidialog_choice", {
      approved: approvedServers.length,
      rejected: rejectedServers.length
    });

    // Update enabled servers in local settings if any approved
    if (approvedServers.length > 0) {
      // Merge and deduplicate
      const updatedEnabled = [...new Set([...enabledServers, ...approvedServers])];
      saveSettingsWithMerge("localSettings", {
        enabledMcpjsonServers: updatedEnabled
      });
    }

    // Update disabled servers in local settings if any rejected
    if (rejectedServers.length > 0) {
      // Merge and deduplicate
      const updatedDisabled = [...new Set([...disabledServers, ...rejectedServers])];
      saveSettingsWithMerge("localSettings", {
        disabledMcpjsonServers: updatedDisabled
      });
    }

    // Invoke completion callback
    onDone();
  }

  // Get keyboard shortcut info for the dialog
  const shortcutInfo = useCtrlKeyActionHandler();

  // Register escape handler to reject all servers
  D0((_, event) => {
    if (event.escape) {
      // On escape, add all serverNames to disabled list
      const localSettings = mergeValidSubscriptions() || {};
      const disabledServers = localSettings.disabledMcpjsonServers || [];
      const updatedDisabled = [...new Set([...disabledServers, ...serverNames])];
      saveSettingsWithMerge("localSettings", {
        disabledMcpjsonServers: updatedDisabled
      });
      onDone();
      return;
    }
  });

  // Render the dialog UI
  return OW.default.createElement(
    OW.default.Fragment,
    null,
    OW.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: theme.warning
      },
      OW.default.createElement(
        _,
        {
          bold: true,
          color: theme.warning
        },
        serverNames.length,
        " new MCP servers found in .mcp.json"
      ),
      OW.default.createElement(
        _,
        null,
        "Select any you wish to enable."
      ),
      OW.default.createElement(mz1, null),
      OW.default.createElement(MultiSelectOptionsRenderer, {
        options: serverNames.map(name => ({
          label: name,
          value: name
        })),
        defaultValue: serverNames,
        onSubmit: handleSubmit
      })
    ),
    OW.default.createElement(
      g,
      { marginLeft: 3 },
      OW.default.createElement(
        _,
        { dimColor: true },
        shortcutInfo.pending
          ? OW.default.createElement(
              OW.default.Fragment,
              null,
              "Press ",
              shortcutInfo.keyName,
              " again to exit"
            )
          : OW.default.createElement(
              OW.default.Fragment,
              null,
              "Space to select · Enter to confirm · Esc to reject all"
            )
      )
    )
  );
}

module.exports = McpServerSelectionDialog;