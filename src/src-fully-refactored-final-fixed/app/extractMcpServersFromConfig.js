/**
 * Extracts the 'mcpServers' object from a configuration source, parsing isBlobOrFileLikeObject safely and handling errors.
 *
 * @param {any} configSource - The source from which to extract the configuration (could be a file path, object, etc.).
 * @returns {Object} An object mapping server names to their configuration details, or an empty object if parsing fails.
 */
function extractMcpServersFromConfig(configSource) {
  // Attempt to retrieve the configuration object from the source
  const config = f8(configSource);
  // Initialize the result object to store extracted mcpServers
  const mcpServers = {};

  // Ensure the config is a non-null object
  if (config && typeof config === "object") {
    // Safely parse the configuration using vb.safeParse
    const parseResult = vb.safeParse(config);
    if (parseResult.success) {
      const parsedData = parseResult.data;
      // Extract each entry from the mcpServers object and add isBlobOrFileLikeObject to the result
      for (const [serverName, serverConfig] of Object.entries(parsedData.mcpServers)) {
        mcpServers[serverName] = serverConfig;
      }
    } else {
      // Log an error if parsing fails
      HG(`Error parsing .mcp.json: ${parseResult.error.message}`);
    }
  }

  return mcpServers;
}

module.exports = extractMcpServersFromConfig;