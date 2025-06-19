/**
 * useMcpUpdates - React hook to manage MCP (Multi-Client Platform) updates, including clients, tools, commands, and resources.
 *
 * This hook initializes and manages the MCP state, handles connection events, authentication, reconnection, and error handling for each client.
 *
 * @param {function} showNotification - Function to display notifications/messages to the user (e.g., toast or snackbar).
 * @param {Object} [initialClientConfig] - Optional object mapping client names to their configuration objects.
 * @returns {void}
 */
function useMcpUpdates(showNotification, initialClientConfig) {
  // Get the MCP state setter from the custom useAppState hook
  const [, setMcpState] = useAppState();

  renderToolUseConfirmationDialog$2.useEffect(() => {
    // Initialize MCP state with clients from YK() and optional initialClientConfig
    setMcpState(prevState => {
      const defaultClients = YK();
      const mergedClients = initialClientConfig ? { ...defaultClients, ...initialClientConfig } : defaultClients;
      const clientEntries = Object.entries(mergedClients).map(([clientName, clientConfig]) => ({
        name: clientName,
        type: "pending",
        config: clientConfig
      }));
      return {
        ...prevState,
        mcp: {
          ...prevState.mcp,
          clients: clientEntries,
          tools: [],
          commands: [],
          resources: {}
        }
      };
    });

    // Helper to update MCP clients
    const updateClients = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          clients: updateFn(prevState.mcp.clients)
        }
      }));
    };

    // Helper to update MCP tools
    const updateTools = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          tools: updateFn(prevState.mcp.tools)
        }
      }));
    };

    // Helper to update MCP commands
    const updateCommands = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          commands: updateFn(prevState.mcp.commands)
        }
      }));
    };

    // Helper to update MCP resources
    const updateResources = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          resources: updateFn(prevState.mcp.resources)
        }
      }));
    };

    // Merge and filter clients, ensuring all from initialClientConfig are present
    updateClients(currentClients => {
      const defaultClients = YK();
      let filteredClients = currentClients.filter(client => defaultClients[client.name] || initialClientConfig?.[client.name]);
      if (initialClientConfig) {
        Object.entries(initialClientConfig).forEach(([clientName, clientConfig]) => {
          if (!filteredClients.find(client => client.name === clientName)) {
            filteredClients.push({
              name: clientName,
              type: "pending",
              config: clientConfig
            });
          }
        });
      }
      return filteredClients;
    });
    updateTools(() => []);
    updateCommands(() => []);
    updateResources(() => ({}));

    // Counter for failed connections
    let failedConnectionCount = 0;

    /**
     * Handles updates for a single MCP client, including connection, authentication, and error events.
     * @param {Object} update - The MCP update object
     * @param {Object} update.client - The client object
     * @param {Array} update.tools - Array of tools
     * @param {Array} update.commands - Array of commands
     * @param {Object} update.resources - Resources object
     */
    const handleMcpUpdate = ({ client, tools, commands, resources }) => {
      try {
        // Handle authentication needed
        if (client.type === "needs-auth") {
          const notification = {
            text: `MCP Server ${FA.bold(client.name)} needs authentication · ${FA.dim("/mcp to authenticate")}`,
            color: "warning"
          };
          showNotification(notification, { timeoutMs: 10000 });
        } else if (client.type === "failed") {
          // Handle failed connection
          if (client.config.type !== "sse-ide" && client.config.type !== "ws-ide") {
            failedConnectionCount++;
          }
          if (failedConnectionCount > 0) {
            const notification = {
              text: `${failedConnectionCount} MCP server${failedConnectionCount > 1 ? "createInteractionAccessor" : ""} failed to connect (see /mcp for info)` ,
              color: "error"
            };
            showNotification(notification, { timeoutMs: 10000 });
          }
        }

        // Handle connected state and transport event wiring
        if (client.type === "connected" && client.client.transport) {
          let isFirstMessage = true;
          const originalOnClose = client.client.transport.onclose;

          // Handler for transport close
          const handleTransportClose = (reason) => {
            if (!isFirstMessage) return;
            isFirstMessage = false;
            logMcpServerError(client.name, reason);
            updateClients(clients => clients.map(c => c.name !== client.name ? c : {
              name: c.name,
              type: "failed",
              config: c.config
            }));
            updateTools(toolsList => d51(toolsList, client.name));
            updateCommands(commandsList => filterOutPrefixedNames(commandsList, client.name));
            updateResources(resourcesObj => omitPropertyFromObject(resourcesObj, client.name));
          };

          // Override onclose to handle reconnection for SSE transports
          client.client.transport.onclose = () => {
            if (originalOnClose) originalOnClose();
            if (client.config.type === "sse" || client.config.type === "sse-ide") {
              logMcpServerDebugMessage(client.name, "SSE transport closed, attempting to reconnect");
              updateClients(clients => clients.map(c => c.name !== client.name ? c : {
                name: c.name,
                type: "pending",
                config: c.config
              }));
              const transport = client.client.transport;
              if (transport && typeof transport.close === "function") {
                transport.close().catch(err => {
                  logMcpServerDebugMessage(client.name, `Error closing old transport: ${err}`);
                });
              }
              setTimeout(() => {
                if (transport) {
                  transport.onclose = undefined;
                  transport.onerror = undefined;
                  transport.onmessage = undefined;
                }
              }, 0);
              initializeClientAndNotify(client.name, client.config, handleMcpUpdate).catch(err => {
                logMcpServerError(client.name, `Reconnection failed: ${err}`);
                handleTransportClose(`Reconnection failed: ${err}`);
              });
            } else {
              handleTransportClose("transport closed");
            }
          };

          // Override onerror
          const originalOnError = client.client.transport.onerror;
          client.client.transport.onerror = (event) => {
            if (originalOnError) originalOnError(event);
            if (client.config.type === "sse" || client.config.type === "sse-ide") {
              logMcpServerError(client.name, `Transport error: ${event}`);
            } else {
              handleTransportClose(event);
            }
          };

          // Override onmessage
          const originalOnMessage = client.client.transport.onmessage;
          client.client.transport.onmessage = (...args) => {
            if (originalOnMessage) originalOnMessage.apply(client.client.transport, args);
            if (!isFirstMessage) return;
            isFirstMessage = false;
            // Mark client as connected
            updateClients(clients => clients.map(c => c.name !== client.name ? c : {
              ...client,
              type: "connected"
            }));
            // Merge tools and commands
            updateTools(currentTools => [
              ...currentTools.filter(tool => !tools.includes(tool)),
              ...tools
            ]);
            updateCommands(currentCommands => [
              ...currentCommands.filter(cmd => !commands.includes(cmd)),
              ...commands
            ]);
            // Update resources if provided
            if (resources) {
              updateResources(currentResources => {
                const updatedResources = { ...currentResources };
                updatedResources[client.name] = resources;
                return updatedResources;
              });
            }
          };
        }

        // Always update state with latest client, tools, commands, and resources
        updateClients(clients => clients.map(c => c.name === client.name ? client : c));
        updateTools(currentTools => [...currentTools, ...tools]);
        updateCommands(currentCommands => [...currentCommands, ...commands]);
        if (resources) {
          updateResources(currentResources => {
            const updatedResources = { ...currentResources };
            updatedResources[client.name] = resources;
            return updatedResources;
          });
        }
      } catch (err) {
        logMcpServerError("useMcpUpdates", `Error handling MCP update: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    // Subscribe to MCP updates
    processClientConnections(handleMcpUpdate, initialClientConfig);
  }, [setMcpState, showNotification, initialClientConfig]);
}

module.exports = useMcpUpdates;