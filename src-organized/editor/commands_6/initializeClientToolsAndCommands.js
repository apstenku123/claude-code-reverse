/**
 * Initializes the client connection, retrieves available tools and commands, and notifies the subscriber with the results.
 *
 * @async
 * @function initializeClientToolsAndCommands
 * @param {object} sourceObservable - The source observable or connection input for the client.
 * @param {object} config - Configuration options for the client connection.
 * @param {function} subscription - Callback function to notify with the client, tools, commands, and resources.
 * @returns {Promise<void>} Resolves when the operation is complete.
 */
async function initializeClientToolsAndCommands(sourceObservable, config, subscription) {
  // Attempt to establish a client connection
  const client = await Ae0(sourceObservable, config);

  // If the client is not connected, notify the subscriber with empty tools and commands
  if (client.type !== "connected") {
    subscription({
      client: client,
      tools: [],
      commands: []
    });
    return;
  }

  // Check if the client supports resources capability
  const hasResourcesCapability = !!client.capabilities?.resources;

  // Fetch tools, commands, and resources in parallel
  const [tools, commands, resources] = await Promise.all([
    GC2(client), // Fetch available tools for the client
    ZC2(client), // Fetch available commands for the client
    Promise.resolve([]) // Placeholder for resources (currently always empty)
  ]);

  // Additional tools can be added to this array if needed
  const additionalTools = [];

  // Notify the subscriber with the client, tools, commands, and resources (if any)
  subscription({
    client: client,
    tools: [...tools, ...additionalTools],
    commands: commands,
    resources: resources.length > 0 ? resources : undefined
  });
}

module.exports = initializeClientToolsAndCommands;