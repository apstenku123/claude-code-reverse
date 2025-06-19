/**
 * Renders the MCP Server menu UI, allowing the user to view tools, authenticate, or go back.
 * The menu adapts based on the server'createInteractionAccessor connection type, authentication status, and environment variables.
 *
 * @param {Object} params - The parameters for rendering the menu.
 * @param {Object} params.server - The MCP server object containing connection and authentication info.
 * @param {number} params.serverToolsCount - The number of tools available on the server.
 * @param {Function} params.onViewTools - Callback when the user selects 'View tools'.
 * @param {Function} params.onAuthenticate - Callback when the user selects 'Authenticate'.
 * @param {Function} params.onCancel - Callback when the user selects 'Back' or cancels the menu.
 * @returns {React.ReactElement} The rendered menu component.
 */
function McpServerMenu({
  server,
  serverToolsCount,
  onViewTools,
  onAuthenticate,
  onCancel
}) {
  // Theme colors/styles
  const theme = getThemeStylesheet();
  // Keyboard state/context
  const keyboardContext = useCtrlKeyActionHandler();
  // Check for remote MCP feature flag
  const isRemoteMcpEnabled = useAsyncValue("tengu_remote_mcp");
  // Determine if SSE authentication is enabled via env or remote MCP
  const isSseAuthEnabled =
    process.env.MCP_SSE_AUTH_ENABLED === "true" ||
    process.env.MCP_SSE_AUTH_ENABLED === "1" ||
    isRemoteMcpEnabled;

  // Build menu options dynamically
  const menuOptions = [];

  // If server is connected, allow viewing tools
  if (server.client.type === "connected") {
    menuOptions.push({
      label: "View tools",
      value: "tools"
    });
  }

  // If server uses SSE and authentication is enabled, show authentication option
  if (server.isSSE && isSseAuthEnabled) {
    // Needs authentication if client type is 'needs-auth', or not authenticated and not connected
    const needsAuthentication =
      server.client.type === "needs-auth" ||
      (server.isAuthenticated === false && server.client.type !== "connected");
    menuOptions.push({
      label: needsAuthentication ? "Authenticate" : "Authentication",
      value: "auth"
    });
  }

  // Always add the 'Back' option
  menuOptions.push({
    label: "Back",
    value: "cancel"
  });

  // Render the menu UI
  return eB.default.createElement(
    eB.default.Fragment,
    null,
    eB.default.createElement(
      g,
      {
        flexDirection: "column",
        gap: 1,
        paddingX: 1,
        borderStyle: "round"
      },
      // Server name
      eB.default.createElement(
        _,
        { bold: true },
        "MCP Server: ",
        server.name
      ),
      // Server type and status
      eB.default.createElement(
        g,
        { flexDirection: "column" },
        // Type
        eB.default.createElement(
          _,
          null,
          eB.default.createElement(_, { bold: true }, "Type: "),
          server.isSSE ? "SSE" : "stdio"
        ),
        // Status
        eB.default.createElement(
          _,
          null,
          eB.default.createElement(_, { bold: true }, "Status: "),
          server.client.type === "connected"
            ? eB.default.createElement(_, null, "Connected")
            : server.client.type === "pending"
            ? eB.default.createElement(_, null, "Connecting…")
            : server.client.type === "needs-auth" && isSseAuthEnabled
            ? eB.default.createElement(_, { color: theme.warning }, "Needs authentication")
            : eB.default.createElement(_, { color: theme.error }, "Failed")
        ),
        // Tools count (only if connected and > 0)
        server.client.type === "connected" && serverToolsCount > 0 &&
          eB.default.createElement(
            _,
            null,
            eB.default.createElement(_, { bold: true }, "Tools: "),
            serverToolsCount
          )
      ),
      // Menu options selector
      eB.default.createElement(
        g,
        null,
        eB.default.createElement(SelectableOptionsList, {
          options: menuOptions,
          onChange: selectedValue => {
            switch (selectedValue) {
              case "cancel":
                onCancel();
                break;
              case "tools":
                onViewTools();
                break;
              case "auth":
                onAuthenticate();
                break;
              default:
                break;
            }
          },
          onCancel: onCancel
        })
      )
    ),
    // Keyboard hint
    eB.default.createElement(
      g,
      { marginLeft: 3 },
      eB.default.createElement(
        _,
        { dimColor: true },
        keyboardContext.pending
          ? eB.default.createElement(
              eB.default.Fragment,
              null,
              "Press ",
              keyboardContext.keyName,
              " again to exit"
            )
          : eB.default.createElement(
              eB.default.Fragment,
              null,
              "Esc to go back"
            )
      )
    )
  );
}

module.exports = McpServerMenu;