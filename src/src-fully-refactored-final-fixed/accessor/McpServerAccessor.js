/**
 * McpServerAccessor
 *
 * Provides a UI flow for selecting, authenticating, and interacting with MCP servers and their tools.
 * Handles server discovery, authentication status, and navigation between server/tool menus.
 *
 * @param {Object} params - The parameters object.
 * @param {Function} params.onComplete - Callback invoked when the flow is completed or when no servers are configured.
 * @returns {React.ReactElement|null} The rendered component for the current UI state.
 */
function McpServerAccessor({ onComplete }) {
  // Get MCP context (contains clients and tools)
  const [mcpContext] = useAppState();
  const mcpClients = mcpContext.mcp.clients;

  // UI state: controls which menu/view is shown
  const [uiState, setUiState] = dK.default.useState({ type: "list" });

  // List of discovered servers with authentication info
  const [servers, setServers] = dK.default.useState([]);

  // Check for remote MCP configuration
  const isRemoteMcp = jb("tengu_remote_mcp");

  // Determine if SSE authentication is enabled (via env or remote MCP)
  const isSseAuthEnabled =
    process.env.MCP_SSE_AUTH_ENABLED === "true" ||
    process.env.MCP_SSE_AUTH_ENABLED === "1" ||
    isRemoteMcp;

  // Effect: Discover and process available MCP servers
  dK.default.useEffect(() => {
    async function fetchServers() {
      // Filter out the 'ide' client and sort by name
      const filteredClients = mcpClients
        .filter(client => client.name !== "ide")
        .sort((a, b) => a.name.localeCompare(b.name));

      // For each client, determine if isBlobOrFileLikeObject'createInteractionAccessor SSE and if isBlobOrFileLikeObject'createInteractionAccessor authenticated
      const serverList = await Promise.all(
        filteredClients.map(async client => {
          const isSse = client.config.type === "sse";
          let isAuthenticated;

          if (isSse && isSseAuthEnabled) {
            // Attempt to fetch tokens for SSE authentication
            const tokens = await new Pm(client.name, client.config).tokens();
            isAuthenticated = Boolean(tokens);
          }

          return {
            name: client.name,
            client,
            isSse,
            isAuthenticated,
            config: isSse ? client.config : undefined
          };
        })
      );
      setServers(serverList);
    }
    fetchServers();
  }, [mcpClients, isSseAuthEnabled]);

  // Effect: Notify if no servers are configured
  dK.useEffect(() => {
    if (servers.length === 0 && mcpClients.length > 0) return;
    if (servers.length === 0) {
      onComplete(
        "No MCP servers configured. Run `claude mcp` to learn about how to configure MCP servers."
      );
    }
  }, [servers.length, mcpClients.length, onComplete]);

  // UI flow switch
  switch (uiState.type) {
    case "list":
      // Show server list
      return dK.default.createElement(McpServerManagerUI, {
        servers,
        onSelectServer: selectedServer =>
          setUiState({ type: "server-menu", server: selectedServer }),
        onComplete
      });

    case "server-menu": {
      // Show menu for a specific server
      const serverTools = Hi(mcpContext.mcp.tools, uiState.server.name);
      return dK.default.createElement(renderMcpServerMenu, {
        server: uiState.server,
        serverToolsCount: serverTools.length,
        onViewTools: () =>
          setUiState({ type: "server-tools", server: uiState.server }),
        onAuthenticate: () =>
          setUiState({ type: "server-auth", server: uiState.server }),
        onCancel: () => setUiState({ type: "list" })
      });
    }

    case "server-tools":
      // Show list of tools for the selected server
      return dK.default.createElement(ToolSelectionMenu, {
        server: uiState.server,
        onSelectTool: (tool, toolIndex) =>
          setUiState({
            type: "server-tool-detail",
            server: uiState.server,
            toolIndex
          }),
        onBack: () =>
          setUiState({ type: "server-menu", server: uiState.server })
      });

    case "server-tool-detail": {
      // Show detail for a specific tool
      const serverTools = Hi(mcpContext.mcp.tools, uiState.server.name);
      const selectedTool = serverTools[uiState.toolIndex];
      if (!selectedTool) {
        setUiState({ type: "server-tools", server: uiState.server });
        return null;
      }
      return dK.default.createElement(ToolErrorDetailsPanel, {
        tool: selectedTool,
        server: uiState.server,
        onBack: () =>
          setUiState({ type: "server-tools", server: uiState.server })
      });
    }

    case "server-auth":
      // Show authentication UI for the selected server
      return dK.default.createElement(McpServerAuthenticationManager, {
        server: uiState.server,
        onComplete,
        onCancel: () =>
          setUiState({ type: "server-menu", server: uiState.server })
      });

    default:
      return null;
  }
}

module.exports = McpServerAccessor;