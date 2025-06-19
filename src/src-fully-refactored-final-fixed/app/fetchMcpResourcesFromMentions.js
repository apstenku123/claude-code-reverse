/**
 * Fetches MCP resources based on mention strings, validates their existence and connection,
 * and returns detailed resource information for each valid mention.
 *
 * @param {string[]} mentionStrings - Array of mention strings in the format 'server:uri'.
 * @param {object} options - Configuration object containing MCP clients and resources.
 * @param {object} options.options - Nested options containing mcpClients and mcpResources.
 * @param {Array} [options.options.mcpClients] - List of available MCP client objects.
 * @param {Object} [options.options.mcpResources] - Mapping of server names to their resources.
 * @returns {Promise<Array<object>>} Array of resource info objects for valid mentions.
 */
async function fetchMcpResourcesFromMentions(mentionStrings, options) {
  // Extract mention candidates using HD5 utility
  const mentionCandidates = HD5(mentionStrings);
  if (mentionCandidates.length === 0) return [];

  // Get list of available MCP clients
  const mcpClients = options.options.mcpClients || [];

  // Process each mention candidate in parallel
  const resourceResults = await Promise.all(
    mentionCandidates.map(async (mention) => {
      try {
        // Split mention into server and uri parts
        const [serverName, ...uriParts] = mention.split(":");
        const resourceUri = uriParts.join(":");

        // Validate mention format
        if (!serverName || !resourceUri) {
          logTelemetryEventIfEnabled("tengu_at_mention_mcp_resource_error", {});
          return null;
        }

        // Find the corresponding MCP client by server name
        const mcpClient = mcpClients.find(client => client.name === serverName);
        if (!mcpClient || mcpClient.type !== "connected") {
          logTelemetryEventIfEnabled("tengu_at_mention_mcp_resource_error", {});
          return null;
        }

        // Find the resource metadata from the resources list
        const resourceList = options.options.mcpResources?.[serverName] || [];
        const resourceMeta = resourceList.find(resource => resource.uri === resourceUri);
        if (!resourceMeta) {
          logTelemetryEventIfEnabled("tengu_at_mention_mcp_resource_error", {});
          return null;
        }

        try {
          // Attempt to read the resource content from the MCP client
          const resourceContent = await mcpClient.client.readResource({ uri: resourceUri });
          logTelemetryEventIfEnabled("tengu_at_mention_mcp_resource_success", {});
          return {
            type: "mcp_resource",
            server: serverName,
            uri: resourceUri,
            name: resourceMeta.name || resourceUri,
            description: resourceMeta.description,
            content: resourceContent
          };
        } catch (readError) {
          logTelemetryEventIfEnabled("tengu_at_mention_mcp_resource_error", {});
          reportErrorIfAllowed(readError);
          return null;
        }
      } catch {
        logTelemetryEventIfEnabled("tengu_at_mention_mcp_resource_error", {});
        return null;
      }
    })
  );

  // Filter out any null results (failed lookups)
  return resourceResults.filter(resource => resource !== null);
}

module.exports = fetchMcpResourcesFromMentions;