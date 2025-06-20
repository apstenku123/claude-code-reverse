/**
 * Displays and manages the list of MCP servers, allowing selection and showing status information.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<Object>} params.servers - Array of MCP server objects to display.
 * @param {Function} params.onSelectServer - Callback invoked when a server is selected.
 * @param {Function} params.onComplete - Callback invoked when the user cancels or completes the selection.
 * @returns {React.ReactElement|null} The rendered React element for the server manager UI, or null if no servers.
 */
function McpServerManager({
  servers,
  onSelectServer,
  onComplete
}) {
  // Theme and style objects
  const theme = getThemeStylesheet();
  const keyInfo = useCtrlKeyActionHandler(); // Keyboard info (e.g., pending, keyName)
  const isTenguRemoteMcp = useAsyncValue("tengu_remote_mcp");

  // Determine if SSE authentication is enabled
  const isSseAuthEnabled =
    process.env.MCP_SSE_AUTH_ENABLED === "true" ||
    process.env.MCP_SSE_AUTH_ENABLED === "1" ||
    isTenguRemoteMcp;

  // If there are no servers, render nothing
  if (servers.length === 0) return null;

  const isDebugMode = Y81();

  // Check if any server is in a failed state
  const hasFailedServer = servers.some(server => server.client.type === "failed");

  // Map servers to options for the selection UI
  const serverOptions = servers.map(server => {
    let statusDescription = "";
    let descriptionColor = undefined;

    // Determine server status and color
    if (server.client.type === "connected") {
      statusDescription = "connected";
    } else if (server.client.type === "pending") {
      statusDescription = "connecting…";
      descriptionColor = theme.warning;
    } else if (server.client.type === "needs-auth" && isSseAuthEnabled) {
      statusDescription = "needs authentication";
      descriptionColor = theme.warning;
    } else {
      statusDescription = "failed";
      descriptionColor = theme.error;
    }

    // Special case: SSE server not authenticated
    if (
      server.isSSE &&
      server.isAuthenticated === false &&
      server.client.type !== "needs-auth" &&
      isSseAuthEnabled
    ) {
      statusDescription = "needs authentication";
      descriptionColor = theme.warning;
    }

    return {
      label: server.name,
      value: server.name,
      description: statusDescription,
      descriptionColor: descriptionColor
    };
  });

  // Render the UI
  return lD.default.createElement(
    g,
    { flexDirection: "column" },
    // Header and server count
    lD.default.createElement(
      g,
      {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round",
        borderColor: theme.secondaryBorder
      },
      lD.default.createElement(
        g,
        { flexDirection: "column", marginBottom: 1 },
        lD.default.createElement(
          _,
          { bold: true },
          "Manage MCP Servers",
          isDebugMode ? " (Debug Mode)" : ""
        ),
        lD.default.createElement(
          _,
          { color: theme.secondaryText },
          servers.length,
          " ",
          servers.length === 1 ? "server" : "servers",
          " found"
        )
      )
    ),
    // Server selection list
    lD.default.createElement(SelectableOptionsList, {
      options: serverOptions,
      onChange: selectedName => {
        const selectedServer = servers.find(server => server.name === selectedName);
        if (selectedServer) {
          onSelectServer(selectedServer);
        }
      },
      onCancel: () => onComplete()
    }),
    // Error log info if any server failed
    hasFailedServer &&
      lD.default.createElement(
        g,
        { marginTop: 1 },
        lD.default.createElement(
          _,
          { dimColor: true },
          y0.info,
          " ",
          isDebugMode
            ? `Error logs will be shown inline. Log files are also saved in\n  ${Cz.baseLogs()}`
            : `Run claude --debug to see error logs inline, or view log files in\n  ${Cz.baseLogs()}`
        )
      ),
    // Keyboard hint
    lD.default.createElement(
      g,
      { marginLeft: 3 },
      lD.default.createElement(
        _,
        { dimColor: true },
        keyInfo.pending
          ? lD.default.createElement(
              lD.default.Fragment,
              null,
              "Press ",
              keyInfo.keyName,
              " again to exit"
            )
          : lD.default.createElement(
              lD.default.Fragment,
              null,
              "Esc to cancel"
            )
      )
    )
  );
}

module.exports = McpServerManager;