/**
 * Processes a set of client connections, fetching their tools, commands, and resources, and passes the results to a callback.
 *
 * @async
 * @function processClientConnections
 * @param {Function} handleClientData - Callback function to process each client'createInteractionAccessor data. Receives an object with client, tools, commands, and optionally resources.
 * @param {Object} [clientOverrides] - Optional overrides to merge with the default client configuration.
 * @returns {Promise<void>} Resolves when all client connections have been processed.
 */
async function processClientConnections(handleClientData, clientOverrides) {
  // Retrieve the default client configuration
  const defaultClientConfig = YK();

  // Merge default configuration with any provided overrides
  const mergedClientConfig = clientOverrides
    ? { ...defaultClientConfig, ...clientOverrides }
    : defaultClientConfig;

  // Process each client entry concurrently
  await Promise.all(
    Object.entries(mergedClientConfig).map(async ([clientKey, clientConfig]) => {
      // Attempt to establish a connection for the client
      const clientConnection = await QJ1(clientKey, clientConfig);

      // If the client is not connected, pass minimal data to the handler and skip further processing
      if (clientConnection.type !== "connected") {
        handleClientData({
          client: clientConnection,
          tools: [],
          commands: []
        });
        return;
      }

      // Check if the client supports resources (not used further in this code)
      const hasResourcesCapability = Boolean(clientConnection.capabilities?.resources);

      // Fetch tools, commands, and resources concurrently
      const [tools, commands, resources] = await Promise.all([
        GC2(clientConnection), // Fetch tools
        ZC2(clientConnection), // Fetch commands
        Promise.resolve([])    // Placeholder for resources (currently always empty)
      ]);

      // Additional tools can be added to this array if needed
      const additionalTools = [];

      // Pass the gathered data to the handler
      handleClientData({
        client: clientConnection,
        tools: [...tools, ...additionalTools],
        commands: commands,
        resources: resources.length > 0 ? resources : undefined
      });
    })
  );
}

module.exports = processClientConnections;