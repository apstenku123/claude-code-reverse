/**
 * Renders the MCP Server menu UI, displaying server status, type, and available actions.
 * Provides options to view tools, authenticate, or go back, depending on server state and environment.
 *
 * @param {Object} params - The parameters for rendering the menu.
 * @param {Object} params.server - The MCP server object containing connection and authentication state.
 * @param {number} params.serverToolsCount - The number of tools available on the server.
 * @param {Function} params.onViewTools - Callback to invoke when the user selects 'View tools'.
 * @param {Function} params.onAuthenticate - Callback to invoke when the user selects 'Authenticate'.
 * @param {Function} params.onCancel - Callback to invoke when the user selects 'Back' or cancels.
 * @returns {React.ReactElement} The rendered menu UI as a React element.
 */
function renderMcpServerMenu({
  server,
  serverToolsCount,
  onViewTools,
  onAuthenticate,
  onCancel
}) {
  // Theme and keybinding helpers
  const theme = getThemeStylesheet(); // getThemeStylesheet()
  const keybinding = useCtrlKeyActionHandler();
  const isRemoteMcp = jb("tengu_remote_mcp");

  // Determine if SSE authentication is enabled via env or remote MCP
  const isSseAuthEnabled =
    process.env.MCP_SSE_AUTH_ENABLED === "true" ||
    process.env.MCP_SSE_AUTH_ENABLED === "1" ||
    isRemoteMcp;

  // Build menu options based on server state
  const menuOptions = [];

  // If connected, allow viewing tools
  if (server.client.type === "connected") {
    menuOptions.push({
      label: "View tools",
      value: "tools"
    });
  }

  // If SSE and authentication is enabled, show authentication option
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

  // Always add a 'Back' option
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
        // Tools count if connected and tools exist
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
          onChange: selectedOption => {
            switch (selectedOption) {
              case "cancel":
                onCancel();
                break;
              case "tools":
                onViewTools();
                break;
              case "auth":
                onAuthenticate();
                break;
            }
          },
          onCancel: onCancel
        })
      )
    ),
    // Keybinding hint
    eB.default.createElement(
      g,
      { marginLeft: 3 },
      eB.default.createElement(
        _,
        { dimColor: true },
        keybinding.pending
          ? eB.default.createElement(
              eB.default.Fragment,
              null,
              "Press ",
              keybinding.keyName,
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

module.exports = renderMcpServerMenu;