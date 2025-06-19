/**
 * Generates a menu configuration object for MCP servers based on the provided server list.
 *
 * Filters out servers named 'ide', then maps each remaining server to a menu item with a label and type.
 * The type is determined by the server'createInteractionAccessor status: 'failed' becomes 'error', 'pending' becomes 'info', and all others become 'check'.
 * If no servers remain after filtering, returns null.
 *
 * @param {Array<Object>} serverList - Array of server objects, each with at least 'name' and 'type' properties.
 * @returns {Object|null} Menu configuration object for MCP servers, or null if no servers are available.
 */
function createMcpServerMenuConfig(serverList = []) {
  // Array to hold menu item objects
  const menuItems = [];

  // Filter out servers named 'ide' and map the rest to menu items
  serverList
    .filter(server => server.name !== "ide")
    .forEach(server => {
      menuItems.push({
        label: server.name,
        // Map server type to menu item type
        type:
          server.type === "failed"
            ? "error"
            : server.type === "pending"
            ? "info"
            : "check"
      });
    });

  // If no menu items were created, return null
  if (menuItems.length === 0) return null;

  // Return the menu configuration object
  return {
    title: "MCP servers",
    command: "/mcp",
    items: menuItems
  };
}

module.exports = createMcpServerMenuConfig;
