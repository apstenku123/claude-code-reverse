/**
 * Removes an MCP server configuration by name from the specified scope (local, user, or project).
 *
 * @param {string} serverName - The name of the MCP server to remove.
 * @param {string} [scope="local"] - The scope from which to remove the server ("local", "user", or "project").
 * @throws {Error} If the server is not found in the specified scope or if removal fails.
 */
function removeMcpServerByName(serverName, scope = "local") {
  if (scope === "project") {
    // Retrieve all project-level MCP servers
    const projectServers = rU();
    if (!projectServers[serverName]) {
      throw new Error(`No MCP server found with name: ${serverName} in .mcp.json`);
    }
    // Create a new object excluding the server to be removed
    const updatedServers = {
      mcpServers: {
        ...projectServers
      }
    };
    delete updatedServers.mcpServers[serverName];
    try {
      Ty1(updatedServers); // Persist the updated project MCP servers
    } catch (error) {
      throw new Error(`Failed to remove from .mcp.json: ${error}`);
    }
  } else if (scope === "user") {
    // Retrieve user-level MCP servers
    const userConfig = getCachedOrFreshConfig();
    if (!userConfig.mcpServers?.[serverName]) {
      throw new Error(`No global MCP server found with name: ${serverName}`);
    }
    delete userConfig.mcpServers[serverName];
    updateProjectsAccessor(userConfig); // Persist the updated user MCP servers
  } else {
    // Default: local scope
    const localConfig = getProjectSubscriptionConfig();
    if (!localConfig.mcpServers?.[serverName]) {
      throw new Error(`No local MCP server found with name: ${serverName}`);
    }
    delete localConfig.mcpServers[serverName];
    updateProjectInConfig(localConfig); // Persist the updated local MCP servers
  }
}

module.exports = removeMcpServerByName;