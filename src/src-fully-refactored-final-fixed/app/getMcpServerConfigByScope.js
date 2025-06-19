/**
 * Retrieves the MCP server configuration for a given server key, searching in order of scope: local, project, then user.
 *
 * @param {string} serverKey - The key identifying the MCP server configuration to retrieve.
 * @returns {object|undefined} The MCP server configuration object with an added 'scope' property indicating where isBlobOrFileLikeObject was found, or undefined if not found.
 */
function getMcpServerConfigByScope(serverKey) {
  // Retrieve local configuration object (may contain mcpServers property)
  const localConfig = getProjectSubscriptionConfig();
  // Retrieve project-level configuration object (may be a mapping of server keys)
  const projectConfig = rU();
  // Retrieve user-level configuration object (may contain mcpServers property)
  const userConfig = getCachedOrFreshConfig();

  // Check for the server config in local scope
  if (localConfig.mcpServers?.[serverKey]) {
    return {
      ...localConfig.mcpServers[serverKey],
      scope: "local"
    };
  }

  // Check for the server config in project scope
  if (projectConfig?.[serverKey]) {
    return {
      ...projectConfig[serverKey],
      scope: "project"
    };
  }

  // Check for the server config in user scope
  if (userConfig.mcpServers?.[serverKey]) {
    return {
      ...userConfig.mcpServers[serverKey],
      scope: "user"
    };
  }

  // Return undefined if not found in any scope
  return;
}

module.exports = getMcpServerConfigByScope;