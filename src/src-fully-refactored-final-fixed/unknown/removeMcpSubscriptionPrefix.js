/**
 * Removes a specific MCP subscription prefix from the provided source string.
 * The prefix format is: 'mcp__<config>__', where <config> is the lowercased and sanitized version of the config string.
 *
 * @param {string} sourceString - The string from which to remove the MCP subscription prefix.
 * @param {string} configName - The configuration name used to build the prefix to remove.
 * @returns {string} The source string with the MCP subscription prefix removed (if present).
 */
function removeMcpSubscriptionPrefix(sourceString, configName) {
  // Sanitize the configName: lowercase and replace non-alphanumeric characters with underscores
  const sanitizedConfigName = configName.toLowerCase().replace(/[^a-z0-9]/g, "_");
  // Build the MCP subscription prefix to remove
  const mcpSubscriptionPrefix = `mcp__${sanitizedConfigName}__`;
  // Remove the prefix from the source string (if present)
  return sourceString.replace(mcpSubscriptionPrefix, "");
}

module.exports = removeMcpSubscriptionPrefix;
