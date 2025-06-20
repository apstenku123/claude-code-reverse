/**
 * Manages authentication and reconnection logic for an MCP server, including UI state and user actions.
 * Handles authenticating, clearing authentication, and reconnecting to the server, updating UI accordingly.
 *
 * @param {Object} params - The parameters for the authentication manager.
 * @param {Object} params.server - The MCP server object, containing name, config, isAuthenticated, and client info.
 * @param {Function} params.onComplete - Callback invoked when authentication or clearing is complete.
 * @param {Function} params.onCancel - Callback invoked when the user cancels the operation.
 * @returns {JSX.Element} The rendered authentication manager UI.
 */
function McpServerAuthenticationManager({
  server,
  onComplete,
  onCancel
}) {
  // Theme and keyboard shortcut utilities
  const theme = getThemeStylesheet();
  const keyboardShortcut = useCtrlKeyActionHandler();

  // UI state: { type: 'detail' | 'authenticating' }
  const [uiState, setUiState] = F5.default.useState({ type: 'detail' });
  // Error message state
  const [errorMessage, setErrorMessage] = F5.default.useState(null);
  // MCP state updater (from useAppState hook)
  const [, updateMcpState] = useAppState();

  /**
   * Handles reconnection to the MCP server after authentication.
   * Updates MCP state with new client, tools, commands, and resources.
   * @param {string} serverName - The server'createInteractionAccessor name.
   * @param {Object} serverConfig - The server'createInteractionAccessor configuration object.
   */
  const reconnectToServer = F5.default.useCallback(async (serverName, serverConfig) => {
    logMcpServerDebugMessage(serverName, 'Starting server reconnection after auth');
    await initializeClientAndNotify(serverName, serverConfig, ({ client, tools, commands, resources }) => {
      updateMcpState(prevState => {
        // Merge new tools and commands, filtering out old ones for this server
        const mergedTools = [
          ...d51(prevState.mcp.tools, serverName),
          ...tools
        ];
        const mergedCommands = [
          ...filterOutPrefixedNames(prevState.mcp.commands, serverName),
          ...commands
        ];
        // Merge resources, replacing for this server if provided
        const mergedResources = {
          ...omitPropertyFromObject(prevState.mcp.resources, serverName)
        };
        if (resources && resources.length > 0) {
          mergedResources[serverName] = resources;
        }
        // Replace client for this server
        const updatedClients = prevState.mcp.clients.map(existingClient =>
          existingClient.name === serverName ? client : existingClient
        );
        logMcpServerDebugMessage(
          serverName,
          `Reconnected: ${tools.length} tools, ${commands.length} commands, ${resources?.length || 0} resources`
        );
        return {
          ...prevState,
          mcp: {
            clients: updatedClients,
            tools: mergedTools,
            commands: mergedCommands,
            resources: mergedResources
          }
        };
      });
    });
  }, [updateMcpState]);

  /**
   * Handles the authentication process for the server.
   * Updates UI state, manages errors, and triggers reconnection.
   */
  const handleAuthenticate = F5.default.useCallback(async () => {
    setUiState({ type: 'authenticating' });
    setErrorMessage(null);
    try {
      // If already authenticated, refresh credentials
      if (server.isAuthenticated && server.config) {
        await revokeOAuthTokens(server.name, server.config);
      }
      if (server.config) {
        // Attempt authentication
        await startOAuthFlowWithLocalCallback(server.name, server.config);
        logTelemetryEventIfEnabled('tengu_mcp_auth_config_authenticate', {
          wasAuthenticated: server.isAuthenticated
        });
        try {
          // Attempt reconnection after authentication
          await reconnectToServer(server.name, server.config);
          onComplete(`Authentication successful. Reconnected to ${server.name}.`);
        } catch (reconnectError) {
          logMcpServerDebugMessage(
            server.name,
            `Reconnection failed: ${reconnectError instanceof Error ? reconnectError.message : String(reconnectError)}`
          );
          onComplete(
            'Authentication successful, but server reconnection failed. You may need to manually restart Claude Code for the changes to take effect.'
          );
        }
      }
    } catch (authError) {
      setErrorMessage(authError instanceof Error ? authError.message : String(authError));
      setUiState({ type: 'detail' });
    }
  }, [server.isAuthenticated, server.config, server.name, onComplete, reconnectToServer]);

  /**
   * Clears authentication for the server and notifies completion.
   */
  function handleClearAuthentication() {
    if (server.config) {
      revokeOAuthTokens(server.name, server.config);
      logTelemetryEventIfEnabled('tengu_mcp_auth_config_clear', {});
      onComplete(`Authentication cleared for ${server.name}.`);
    }
  }

  // Automatically trigger authentication if needed when component mounts or relevant state changes
  F5.default.useEffect(() => {
    const needsAuth =
      server.client.type === 'needs-auth' ||
      (server.isAuthenticated === false && server.client.type !== 'connected');
    if (needsAuth && uiState.type === 'detail') {
      handleAuthenticate();
    }
  }, [server.client.type, server.isAuthenticated, uiState.type, handleAuthenticate]);

  // Show authenticating UI
  if (uiState.type === 'authenticating') {
    return F5.default.createElement(
      g,
      {
        flexDirection: 'column',
        gap: 1,
        padding: 1
      },
      F5.default.createElement(
        _,
        { color: theme.claude },
        'Authenticating with ',
        server.name,
        '…'
      ),
      F5.default.createElement(
        g,
        null,
        F5.default.createElement(AnimatedStatusText, null),
        F5.default.createElement(_, null, ' a browser window will open for authentication')
      ),
      F5.default.createElement(
        _,
        { dimColor: true },
        'Return here after authenticating in your browser.'
      )
    );
  }

  // Define menu options based on authentication state
  const menuOptions = server.isAuthenticated
    ? [
        { label: 'Re-authenticate', value: 'reauth' },
        { label: 'Clear authentication', value: 'clear' },
        { label: 'Back', value: 'cancel' }
      ]
    : [
        { label: 'Authenticate', value: 'auth' },
        { label: 'Back', value: 'cancel' }
      ];

  // Render main UI
  return F5.default.createElement(
    F5.default.Fragment,
    null,
    F5.default.createElement(
      g,
      {
        flexDirection: 'column',
        gap: 1,
        paddingX: 1,
        borderStyle: 'round'
      },
      F5.default.createElement(
        _,
        { bold: true },
        'MCP Server: ',
        server.name
      ),
      F5.default.createElement(
        g,
        { flexDirection: 'column' },
        server.config &&
          F5.default.createElement(
            _,
            null,
            F5.default.createElement(_, { bold: true }, 'URL: '),
            server.config.url
          ),
        F5.default.createElement(
          _,
          null,
          F5.default.createElement(_, { bold: true }, 'Status: '),
          server.isAuthenticated
            ? F5.default.createElement(_, { color: theme.success }, 'Authenticated')
            : F5.default.createElement(_, { color: theme.warning }, 'Not authenticated')
        )
      )
    ),
    errorMessage &&
      F5.default.createElement(
        g,
        { marginTop: 1 },
        F5.default.createElement(_, { color: theme.error }, 'Error: ', errorMessage)
      ),
    F5.default.createElement(
      g,
      { marginTop: 1 },
      F5.default.createElement(SelectableOptionsList, {
        options: menuOptions,
        onChange: async selectedValue => {
          if (selectedValue === 'cancel') {
            onCancel();
          } else if (selectedValue === 'auth' || selectedValue === 'reauth') {
            handleAuthenticate();
          } else if (selectedValue === 'clear') {
            handleClearAuthentication();
          }
        },
        onCancel: onCancel
      })
    ),
    F5.default.createElement(
      g,
      { marginLeft: 3 },
      F5.default.createElement(
        _,
        { dimColor: true },
        keyboardShortcut.pending
          ? F5.default.createElement(
              F5.default.Fragment,
              null,
              'Press ',
              keyboardShortcut.keyName,
              ' again to exit'
            )
          : F5.default.createElement(
              F5.default.Fragment,
              null,
              'Esc to go back'
            )
      )
    )
  );
}

module.exports = McpServerAuthenticationManager;