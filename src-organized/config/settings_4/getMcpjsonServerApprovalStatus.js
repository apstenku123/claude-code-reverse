/**
 * Determines the approval status of a given MCP JSON server based on configuration settings.
 *
 * @param {string} serverName - The name of the MCP JSON server to check.
 * @returns {"approved"|"rejected"|"pending"} - The approval status: "approved", "rejected", or "pending".
 */
function getMcpjsonServerApprovalStatus(serverName) {
  // Retrieve the current configuration object
  const config = mergeValidSubscriptions();

  // If the server is explicitly disabled, return 'rejected'
  if (config?.disabledMcpjsonServers?.includes(serverName)) {
    return "rejected";
  }

  // If the server is explicitly enabled or all servers are enabled, return 'approved'
  if (
    config?.enabledMcpjsonServers?.includes(serverName) ||
    config?.enableAllProjectMcpServers
  ) {
    return "approved";
  }

  // Otherwise, the status is 'pending'
  return "pending";
}

module.exports = getMcpjsonServerApprovalStatus;