/**
 * Displays a dialog for enabling/disabling newly found MCP servers from .mcp.json,
 * updates local settings based on user selection, and handles escape/reject logic.
 *
 * @param {Object} params - The parameters object.
 * @param {string[]} params.serverNames - Array of new MCP server names found in .mcp.json.
 * @param {Function} params.onDone - Callback to invoke when the dialog is completed or dismissed.
 * @returns {React.Element} The rendered React component for the dialog UI.
 */
function mapLocalSettings({
  serverNames,
  onDone
}) {
  // Get theme colors/styles
  const theme = getThemeStylesheet();

  /**
   * Handles submission of selected servers to enable/disable.
   * Updates local settings accordingly.
   *
   * @param {string[]} selectedServers - Array of server names selected by the user to enable.
   */
  function handleServerSelection(selectedServers) {
    // Get current enabled/disabled servers from local settings
    const localSettings = mergeValidSubscriptions() || {};
    const enabledServers = localSettings.enabledMcpjsonServers || [];
    const disabledServers = localSettings.disabledMcpjsonServers || [];

    // Partition serverNames into approved (enabled) and rejected (disabled)
    const [approvedServers, rejectedServers] = VE1(serverNames, name => selectedServers.includes(name));

    // Track the user'createInteractionAccessor choice for analytics/telemetry
    logTelemetryEventIfEnabled("tengu_mcp_multidialog_choice", {
      approved: approvedServers.length,
      rejected: rejectedServers.length
    });

    // If any servers were approved, update enabledMcpjsonServers in local settings
    if (approvedServers.length > 0) {
      // Merge and deduplicate
      const updatedEnabled = [...new Set([...enabledServers, ...approvedServers])];
      saveSettingsWithMerge("localSettings", {
        enabledMcpjsonServers: updatedEnabled
      });
    }

    // If any servers were rejected, update disabledMcpjsonServers in local settings
    if (rejectedServers.length > 0) {
      // Merge and deduplicate
      const updatedDisabled = [...new Set([...disabledServers, ...rejectedServers])];
      saveSettingsWithMerge("localSettings", {
        disabledMcpjsonServers: updatedDisabled
      });
    }

    // Invoke callback to signal completion
    onDone();
  }

  // Get keybinding/help state
  const keyHelp = useCtrlKeyActionHandler();

  // Register escape handler: disables all new servers if user presses escape
  D0((_, event) => {
    if (event.escape) {
      const localSettings = mergeValidSubscriptions() || {};
      const disabledServers = localSettings.disabledMcpjsonServers || [];
      // Add all new servers to disabled list, deduplicated
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
        onSubmit: handleServerSelection
      })
    ),
    OW.default.createElement(
      g,
      { marginLeft: 3 },
      OW.default.createElement(
        _,
        { dimColor: true },
        keyHelp.pending
          ? OW.default.createElement(
              OW.default.Fragment,
              null,
              "Press ",
              keyHelp.keyName,
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

module.exports = mapLocalSettings;