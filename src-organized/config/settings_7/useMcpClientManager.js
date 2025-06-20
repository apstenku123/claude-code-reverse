/**
 * Manages MCP (Multi-Client Platform) client state, tools, commands, and resources in a React context.
 * Handles client connection lifecycle, authentication, reconnection, and error notifications.
 *
 * @param {function} notifyUser - Function to notify the user (e.g., show a toast or banner).
 * @param {Object} [clientConfig] - Optional configuration object mapping client names to their configs.
 * @returns {void}
 */
function useMcpClientManager(notifyUser, clientConfig) {
  // Destructure the state setter from a custom hook
  const [, setMcpState] = useAppState();

  renderToolUseConfirmationDialog$2.useEffect(() => {
    // Initialize MCP state with clients, tools, commands, and resources
    setMcpState(prevState => {
      const defaultClients = YK();
      // Merge default clients with any provided config
      const mergedClients = clientConfig ? { ...defaultClients, ...clientConfig } : defaultClients;
      // Convert client configs to an array of client descriptors
      const clientList = Object.entries(mergedClients).map(([clientName, config]) => ({
        name: clientName,
        type: "pending",
        config
      }));
      return {
        ...prevState,
        mcp: {
          ...prevState.mcp,
          clients: clientList,
          tools: [],
          commands: [],
          resources: {}
        }
      };
    });

    // Helper to update clients array in MCP state
    const updateClients = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          clients: updateFn(prevState.mcp.clients)
        }
      }));
    };

    // Helper to update tools array in MCP state
    const updateTools = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          tools: updateFn(prevState.mcp.tools)
        }
      }));
    };

    // Helper to update commands array in MCP state
    const updateCommands = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          commands: updateFn(prevState.mcp.commands)
        }
      }));
    };

    // Helper to update resources object in MCP state
    const updateResources = updateFn => {
      setMcpState(prevState => ({
        ...prevState,
        mcp: {
          ...prevState.mcp,
          resources: updateFn(prevState.mcp.resources)
        }
      }));
    };

    // Initialize clients, tools, commands, and resources
    updateClients(existingClients => {
      const defaultClients = YK();
      // Filter clients to those present in default or config
      let filteredClients = existingClients.filter(client => defaultClients[client.name] || clientConfig?.[client.name]);
      // Add any new clients from config not already present
      if (clientConfig) {
        Object.entries(clientConfig).forEach(([clientName, config]) => {
          if (!filteredClients.find(client => client.name === clientName)) {
            filteredClients.push({
              name: clientName,
              type: "pending",
              config
            });
          }
        });
      }
      return filteredClients;
    });
    updateTools(() => []);
    updateCommands(() => []);
    updateResources(() => ({}));

    // Tracks the number of failed connections
    let failedConnectionCount = 0;

    /**
     * Handles updates from MCP clients, including connection, authentication, and error events.
     * @param {Object} update - The update payload from a client.
     * @param {Object} update.client - The client descriptor.
     * @param {Array} update.tools - Array of tool descriptors.
     * @param {Array} update.commands - Array of command descriptors.
     * @param {Object} update.resources - Resource mapping.
     */
    const handleMcpUpdate = ({ client, tools, commands, resources }) => {
      try {
        // Handle authentication needed
        if (client.type === "needs-auth") {
          const authNotification = {
            text: `MCP Server ${FA.bold(client.name)} needs authentication · ${FA.dim("/mcp to authenticate")}`,
            color: "warning"
          };
          notifyUser(authNotification, { timeoutMs: 10000 });
        } else if (client.type === "failed") {
          // Only count failures for non-IDE transports
          if (client.config.type !== "sse-ide" && client.config.type !== "ws-ide") {
            failedConnectionCount++;
          }
          if (failedConnectionCount > 0) {
            const errorNotification = {
              text: `${failedConnectionCount} MCP server${failedConnectionCount > 1 ? "createInteractionAccessor" : ""} failed to connect (see /mcp for info)` ,
              color: "error"
            };
            notifyUser(errorNotification, { timeoutMs: 10000 });
          }
        }

        // Handle successful connection
        if (client.type === "connected" && client.client.transport) {
          let isFirstMessage = true;
          const originalOnClose = client.client.transport.onclose;

          // Handler for transport close event
          const handleTransportClose = (reason) => {
            if (!isFirstMessage) return;
            isFirstMessage = false;
            logMcpServerError(client.name, reason);
            // Mark client as failed
            updateClients(clients => clients.map(c => c.name !== client.name ? c : {
              name: c.name,
              type: "failed",
              config: c.config
            }));
            updateTools(toolsArr => d51(toolsArr, client.name));
            updateCommands(commandsArr => filterOutPrefixedNames(commandsArr, client.name));
            updateResources(resourcesObj => omitPropertyFromObject(resourcesObj, client.name));
          };

          // Override transport onclose
          client.client.transport.onclose = () => {
            if (originalOnClose) originalOnClose();
            if (client.config.type === "sse" || client.config.type === "sse-ide") {
              logMcpServerDebugMessage(client.name, "SSE transport closed, attempting to reconnect");
              // Mark client as pending
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

          // Override transport onerror
          const originalOnError = client.client.transport.onerror;
          client.client.transport.onerror = (event) => {
            if (originalOnError) originalOnError(event);
            if (client.config.type === "sse" || client.config.type === "sse-ide") {
              logMcpServerError(client.name, `Transport error: ${event}`);
            } else {
              handleTransportClose(event);
            }
          };

          // Override transport onmessage
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
            updateTools(existingTools => [
              ...existingTools.filter(tool => !tools.includes(tool)),
              ...tools
            ]);
            updateCommands(existingCommands => [
              ...existingCommands.filter(cmd => !commands.includes(cmd)),
              ...commands
            ]);
            // Merge resources if provided
            if (resources) {
              updateResources(existingResources => {
                const updatedResources = { ...existingResources };
                updatedResources[client.name] = resources;
                return updatedResources;
              });
            }
          };
        }

        // Always update state with latest client, tools, commands, and resources
        updateClients(clients => clients.map(c => c.name === client.name ? client : c));
        updateTools(existingTools => [...existingTools, ...tools]);
        updateCommands(existingCommands => [...existingCommands, ...commands]);
        if (resources) {
          updateResources(existingResources => {
            const updatedResources = { ...existingResources };
            updatedResources[client.name] = resources;
            return updatedResources;
          });
        }
      } catch (error) {
        logMcpServerError("useMcpUpdates", `Error handling MCP update: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    // Subscribe to MCP updates
    processClientConnections(handleMcpUpdate, clientConfig);
  }, [setMcpState, notifyUser, clientConfig]);
}

module.exports = useMcpClientManager;