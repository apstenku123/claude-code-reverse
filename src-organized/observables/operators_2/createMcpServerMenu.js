/**
 * Generates a menu configuration object for MCP servers based on the provided server list.
 * Excludes servers named 'ide' and maps server types to menu item types.
 *
 * @param {Array<Object>} servers - Array of server objects, each with 'name' and 'type' properties.
 * @returns {Object|null} Menu configuration object for MCP servers, or null if no valid servers are found.
 */
function createMcpServerMenu(servers = []) {
  // Filter out servers named 'ide'
  const filteredServers = servers.filter(server => server.name !== "ide");

  // Map filtered servers to menu items with appropriate label and type
  const menuItems = filteredServers.map(server => {
    let itemType;
    if (server.type === "failed") {
      itemType = "error";
    } else if (server.type === "pending") {
      itemType = "info";
    } else {
      itemType = "check";
    }
    return {
      label: server.name,
      type: itemType
    };
  });

  // If there are no menu items, return null
  if (menuItems.length === 0) {
    return null;
  }

  // Return the menu configuration object
  return {
    title: "MCP servers",
    command: "/mcp",
    items: menuItems
  };
}

module.exports = createMcpServerMenu;