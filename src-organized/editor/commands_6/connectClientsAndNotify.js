/**
 * Processes a set of client configurations, attempts to connect each client, and notifies the observer with the connection result and associated tools/commands/resources.
 *
 * @param {Function} notifyObserver - Callback function to notify with client connection results. Receives an object with client, tools, commands, and resources.
 * @param {Object} [clientConfigOverrides] - Optional overrides for the default client configuration.
 * @returns {Promise<void>} Resolves when all client connections have been processed and observers notified.
 */
async function connectClientsAndNotify(notifyObserver, clientConfigOverrides) {
  // Retrieve the default client configuration
  const defaultClientConfig = YK();

  // Merge default config with any overrides provided
  const mergedClientConfig = clientConfigOverrides
    ? { ...defaultClientConfig, ...clientConfigOverrides }
    : defaultClientConfig;

  // Process each client configuration in parallel
  await Promise.all(
    Object.entries(mergedClientConfig).map(async ([clientKey, clientOptions]) => {
      // Attempt to connect to the client
      const clientConnection = await QJ1(clientKey, clientOptions);

      // If the client is not connected, notify observer with empty tools/commands
      if (clientConnection.type !== "connected") {
        notifyObserver({
          client: clientConnection,
          tools: [],
          commands: []
        });
        return;
      }

      // Check if the client supports resources (not used further in this function)
      const hasResourcesCapability = Boolean(clientConnection.capabilities?.resources);

      // Fetch tools, commands, and resources for the connected client in parallel
      const [tools, commands, resources] = await Promise.all([
        GC2(clientConnection), // Fetch tools
        ZC2(clientConnection), // Fetch commands
        Promise.resolve([])    // Placeholder for resources (currently always empty)
      ]);

      // Additional tools can be added to this array if needed
      const additionalTools = [];

      // Notify observer with the connected client and its tools/commands/resources
      notifyObserver({
        client: clientConnection,
        tools: [...tools, ...additionalTools],
        commands: commands,
        resources: resources.length > 0 ? resources : undefined
      });
    })
  );
}

module.exports = connectClientsAndNotify;
