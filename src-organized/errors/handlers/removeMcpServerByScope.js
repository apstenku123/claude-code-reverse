/**
 * Removes an MCP server entry by name from the specified configuration scope (local, user, or project).
 *
 * @param {string} serverName - The name of the MCP server to remove.
 * @param {string} [scope="local"] - The configuration scope to remove from: "local", "user", or "project".
 * @throws {Error} If the server is not found in the specified scope, or if removal fails.
 */
function removeMcpServerByScope(serverName, scope = "local") {
  if (scope === "project") {
    // Read the project-level MCP server configuration
    const projectMcpServers = rU();
    if (!projectMcpServers[serverName]) {
      throw new Error(`No MCP server found with name: ${serverName} in .mcp.json`);
    }
    // Prepare a new object for update, excluding the server to be removed
    const updatedConfig = {
      mcpServers: {
        ...projectMcpServers
      }
    };
    delete updatedConfig.mcpServers[serverName];
    try {
      // Persist the updated project-level configuration
      Ty1(updatedConfig);
    } catch (error) {
      throw new Error(`Failed to remove from .mcp.json: ${error}`);
    }
  } else if (scope === "user") {
    // Read the user-level MCP server configuration
    const userConfig = getCachedOrFreshConfig();
    if (!userConfig.mcpServers?.[serverName]) {
      throw new Error(`No global MCP server found with name: ${serverName}`);
    }
    // Remove the server and persist the updated user-level configuration
    delete userConfig.mcpServers[serverName];
    updateProjectsAccessor(userConfig);
  } else {
    // Default to local scope: read the local MCP server configuration
    const localConfig = getProjectSubscriptionConfig();
    if (!localConfig.mcpServers?.[serverName]) {
      throw new Error(`No local MCP server found with name: ${serverName}`);
    }
    // Remove the server and persist the updated local configuration
    delete localConfig.mcpServers[serverName];
    updateProjectInConfig(localConfig);
  }
}

module.exports = removeMcpServerByScope;