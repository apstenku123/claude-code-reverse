/**
 * Displays a dialog for selecting which new MCP servers (from .mcp.json) to enable or disable.
 * Updates local settings based on user selection and handles escape/reject-all logic.
 *
 * @param {Object} params - The parameters object.
 * @param {string[]} params.serverNames - List of new MCP server names found in .mcp.json.
 * @param {Function} params.onDone - Callback to invoke when the dialog is completed (either by selection or escape).
 * @returns {React.Element} The rendered selection dialog React element.
 */
function McpJsonServerSelectionDialog({
  serverNames,
  onDone
}) {
  // Get theme styles for consistent UI appearance
  const theme = getThemeStylesheet();

  /**
   * Handles submission of selected servers to enable/disable.
   * Updates local settings accordingly.
   * @param {string[]} selectedServers - Array of server names selected by the user to enable.
   */
  function handleSubmit(selectedServers) {
    // Get current settings or default to empty objects/arrays
    const localSettings = mergeValidSubscriptions() || {};
    const enabledServers = localSettings.enabledMcpjsonServers || [];
    const disabledServers = localSettings.disabledMcpjsonServers || [];

    // Partition the serverNames into approved (selected) and rejected (not selected)
    const [approvedServers, rejectedServers] = VE1(serverNames, name => selectedServers.includes(name));

    // Log the user'createInteractionAccessor choice for analytics or tracking
    logTelemetryEventIfEnabled("tengu_mcp_multidialog_choice", {
      approved: approvedServers.length,
      rejected: rejectedServers.length
    });

    // If any servers were approved (enabled), update the enabled list in local settings
    if (approvedServers.length > 0) {
      // Merge and deduplicate
      const newEnabledServers = [...new Set([...enabledServers, ...approvedServers])];
      saveSettingsWithMerge("localSettings", {
        enabledMcpjsonServers: newEnabledServers
      });
    }

    // If any servers were rejected (disabled), update the disabled list in local settings
    if (rejectedServers.length > 0) {
      const newDisabledServers = [...new Set([...disabledServers, ...rejectedServers])];
      saveSettingsWithMerge("localSettings", {
        disabledMcpjsonServers: newDisabledServers
      });
    }

    // Invoke completion callback
    onDone();
  }

  // Get keybinding/help info for the dialog
  const keyInfo = useCtrlKeyActionHandler();

  // Register a handler for escape/reject-all (e.g., pressing Esc key)
  D0((_, event) => {
    if (event.escape) {
      // On escape, add all serverNames to the disabled list
      const localSettings = mergeValidSubscriptions() || {};
      const disabledServers = localSettings.disabledMcpjsonServers || [];
      const newDisabledServers = [...new Set([...disabledServers, ...serverNames])];
      saveSettingsWithMerge("localSettings", {
        disabledMcpjsonServers: newDisabledServers
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
        { bold: true, color: theme.warning },
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
        options: serverNames.map(name => ({ label: name, value: name })),
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
        keyInfo.pending
          ? OW.default.createElement(
              OW.default.Fragment,
              null,
              "Press ",
              keyInfo.keyName,
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

module.exports = McpJsonServerSelectionDialog;