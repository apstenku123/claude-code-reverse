/**
 * Updates the MCP server configuration for a given scope (local, user, or project).
 *
 * Depending on the scope, this function updates the MCP server entry in the appropriate configuration
 * (local, user, or project) and persists the changes using the corresponding update method.
 *
 * @param {string} serverName - The name/key of the MCP server to update.
 * @param {object} serverConfig - The configuration object for the MCP server.
 * @param {string} [scope="local"] - The configuration scope to update: "local", "user", or "project".
 * @throws {Error} Throws an error if writing to the project configuration fails.
 * @returns {void}
 */
function updateMcpServerConfig(serverName, serverConfig, scope = "local") {
  if (scope === "project") {
    // Get the current project-level MCP servers configuration
    const projectConfig = {
      mcpServers: {
        ...rU() // Retrieve current project MCP servers
      }
    };
    // Update the specified server configuration
    projectConfig.mcpServers[serverName] = serverConfig;
    try {
      Ty1(projectConfig); // Persist the updated project configuration
    } catch (error) {
      throw new Error(`Failed to write to mcp.json: ${error}`);
    }
  } else if (scope === "user") {
    // Retrieve the user-level configuration
    const userConfig = getCachedOrFreshConfig();
    // Ensure the mcpServers object exists
    if (!userConfig.mcpServers) {
      userConfig.mcpServers = {};
    }
    // Update the specified server configuration
    userConfig.mcpServers[serverName] = serverConfig;
    updateProjectsAccessor(userConfig); // Persist the updated user configuration
  } else {
    // Default to local configuration if scope is not 'project' or 'user'
    const localConfig = getProjectSubscriptionConfig();
    // Ensure the mcpServers object exists
    if (!localConfig.mcpServers) {
      localConfig.mcpServers = {};
    }
    // Update the specified server configuration
    localConfig.mcpServers[serverName] = serverConfig;
    updateProjectInConfig(localConfig); // Persist the updated local configuration
  }
}

module.exports = updateMcpServerConfig;