/**
 * Synchronizes MCP (Multi-Client Platform) data state with UI and manages client/tool/command/resource updates.
 * Handles connection, authentication, error, and reconnection logic for MCP clients.
 *
 * @param {function} notifyUser - Function to notify the user (e.g., show a toast or alert).
 * @param {Object} [clientConfigOverrides] - Optional overrides for MCP client configurations.
 * @returns {void}
 */
function useMcpDataSync(notifyUser, clientConfigOverrides) {
  // Get the state setter from the custom useAppState hook
  const [, setMcpState] = useAppState();

  renderToolUseConfirmationDialog$2.useEffect(() => {
    // Initialize MCP state with clients, tools, commands, and resources
    setMcpState(prevState => {
      const defaultClients = YK();
      // Merge default clients with any overrides
      const mergedClients = clientConfigOverrides ? { ...defaultClients, ...clientConfigOverrides } : defaultClients;
      // Convert client configs to array of client objects
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
    updateClients(currentClients => {
      const defaultClients = YK();
      // Keep only clients present in defaults or overrides
      let filteredClients = currentClients.filter(client => defaultClients[client.name] || clientConfigOverrides?.[client.name]);
      // Add any missing clients from overrides
      if (clientConfigOverrides) {
        Object.entries(clientConfigOverrides).forEach(([clientName, clientConfig]) => {
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

    // Track number of failed connections for error reporting
    let failedConnectionCount = 0;

    /**
     * Handles updates for a single MCP client and its associated tools, commands, and resources.
     * @param {Object} update - The update object containing client, tools, commands, resources.
     */
    const handleMcpUpdate = ({ client, tools, commands, resources }) => {
      try {
        // Handle authentication needed
        if (client.type === "needs-auth") {
          const authMessage = {
            text: `MCP Server ${FA.bold(client.name)} needs authentication · ${FA.dim("/mcp to authenticate")}`,
            color: "warning"
          };
          notifyUser(authMessage, { timeoutMs: 10000 });
        } else if (client.type === "failed") {
          // Only count failures for non-IDE transports
          if (client.config.type !== "sse-ide" && client.config.type !== "ws-ide") {
            failedConnectionCount++;
          }
          if (failedConnectionCount > 0) {
            const errorMessage = {
              text: `${failedConnectionCount} MCP server${failedConnectionCount > 1 ? "createInteractionAccessor" : ""} failed to connect (see /mcp for info)`,
              color: "error"
            };
            notifyUser(errorMessage, { timeoutMs: 10000 });
          }
        }

        // Handle connected client with transport
        if (client.type === "connected" && client.client.transport) {
          let isFirstMessage = true;
          const originalOnClose = client.client.transport.onclose;

          // Handler for permanent failure or reconnection failure
          const handleTransportFailure = (reason) => {
            if (!isFirstMessage) return;
            isFirstMessage = false;
            logMcpServerError(client.name, reason);
            // Mark client as failed
            updateClients(clients => clients.map(c => c.name !== client.name ? c : {
              name: c.name,
              type: "failed",
              config: c.config
            }));
            // Remove tools, commands, resources for this client
            updateTools(toolsArr => d51(toolsArr, client.name));
            updateCommands(commandsArr => filterOutPrefixedNames(commandsArr, client.name));
            updateResources(resourcesObj => omitPropertyFromObject(resourcesObj, client.name));
          };

          // Override transport onclose handler
          client.client.transport.onclose = () => {
            if (originalOnClose) originalOnClose();
            // For SSE transports, attempt reconnection
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
              // Attempt reconnection
              initializeClientAndNotify(client.name, client.config, handleMcpUpdate).catch(err => {
                logMcpServerError(client.name, `Reconnection failed: ${err}`);
                handleTransportFailure(`Reconnection failed: ${err}`);
              });
            } else {
              handleTransportFailure("transport closed");
            }
          };

          // Override transport onerror handler
          const originalOnError = client.client.transport.onerror;
          client.client.transport.onerror = (errorEvent) => {
            if (originalOnError) originalOnError(errorEvent);
            if (client.config.type === "sse" || client.config.type === "sse-ide") {
              logMcpServerError(client.name, `Transport error: ${errorEvent}`);
            } else {
              handleTransportFailure(errorEvent);
            }
          };

          // Override transport onmessage handler
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
              ...currentTools.filter(processRuleBeginHandlers => !tools.includes(processRuleBeginHandlers)),
              ...tools
            ]);
            updateCommands(currentCommands => [
              ...currentCommands.filter(cmd => !commands.includes(cmd)),
              ...commands
            ]);
            // Update resources for this client
            if (resources) {
              updateResources(currentResources => {
                const updatedResources = { ...currentResources };
                updatedResources[client.name] = resources;
                return updatedResources;
              });
            }
          };
        }

        // Always update state with latest client/tools/commands/resources
        updateClients(clients => clients.map(c => c.name === client.name ? client : c));
        updateTools(toolsArr => [...toolsArr, ...tools]);
        updateCommands(commandsArr => [...commandsArr, ...commands]);
        if (resources) {
          updateResources(resourcesObj => {
            const updatedResources = { ...resourcesObj };
            updatedResources[client.name] = resources;
            return updatedResources;
          });
        }
      } catch (err) {
        logMcpServerError("useMcpUpdates", `Error handling MCP update: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    // Subscribe to MCP updates
    processClientConnections(handleMcpUpdate, clientConfigOverrides);
  }, [setMcpState, notifyUser, clientConfigOverrides]);
}

module.exports = useMcpDataSync;