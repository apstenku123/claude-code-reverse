/**
 * Generates a configuration object representing the status of MCP servers, excluding the 'ide' server.
 *
 * @param {Array<Object>} servers - An array of server objects, each with a 'name' and 'type' property.
 * @returns {Object|null} An object containing the title, command, and items (server statuses), or null if no servers are present (excluding 'ide').
 */
function createPendingServerList(servers = []) {
  // Filter out the 'ide' server
  const filteredServers = servers.filter(server => server.name !== "ide");

  // Map filtered servers to status items
  const serverStatusItems = [];
  filteredServers.forEach(server => {
    serverStatusItems.push({
      label: server.name,
      type:
        server.type === "failed"
          ? "error"
          : server.type === "pending"
          ? "info"
          : "check"
    });
  });

  // If no servers remain after filtering, return null
  if (serverStatusItems.length === 0) {
    return null;
  }

  // Return the configuration object for MCP servers
  return {
    title: "MCP servers",
    command: "/mcp",
    items: serverStatusItems
  };
}

module.exports = createPendingServerList;