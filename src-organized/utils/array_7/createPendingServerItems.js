/**
 * Generates a configuration object for MCP servers based on the provided server status list.
 *
 * Filters out any server with the name 'ide', then maps the remaining servers to an array of items
 * with a label and a type ("error" for failed, "info" for pending, "check" otherwise).
 *
 * @param {Array<{name: string, type: string}>} serverStatusList - Array of server status objects to process.
 * @returns {object|null} Configuration object for MCP servers, or null if no valid servers are found.
 */
function createPendingServerItems(serverStatusList = []) {
  // Array to hold the processed server items
  const serverItems = [];

  // Filter out servers named 'ide' and process the rest
  serverStatusList
    .filter(server => server.name !== "ide")
    .forEach(server => {
      // Determine the type for each server item
      let itemType;
      if (server.type === "failed") {
        itemType = "error";
      } else if (server.type === "pending") {
        itemType = "info";
      } else {
        itemType = "check";
      }

      // Add the processed server item to the array
      serverItems.push({
        label: server.name,
        type: itemType
      });
    });

  // If no valid server items were found, return null
  if (serverItems.length === 0) {
    return null;
  }

  // Return the configuration object for MCP servers
  return {
    title: "MCP servers",
    command: "/mcp",
    items: serverItems
  };
}

module.exports = createPendingServerItems;