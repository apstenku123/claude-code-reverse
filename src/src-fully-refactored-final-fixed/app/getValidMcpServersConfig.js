/**
 * Retrieves and validates the MCP servers configuration from the user'createInteractionAccessor platform.
 * Only supports macOS and WSL platforms. Reads a config file, parses its contents,
 * and returns an object containing only valid MCP server entries.
 *
 * @returns {Object} An object mapping server names to their validated configuration data.
 * @throws {Error} If the platform is unsupported.
 */
function getValidMcpServersConfig() {
  // Ensure the current platform is supported (macOS or WSL)
  if (!QT1.includes(rQ())) {
    throw new Error("Unsupported platform - Claude Desktop integration only works on macOS and WSL.");
  }

  try {
    // Get the path to the MCP servers config file
    const configFilePath = getClaudeDesktopConfigPath();

    // If the config file does not exist, return an empty object
    if (!f1().existsSync(configFilePath)) {
      return {};
    }

    // Read the config file as UTF-8 text
    const configFileContents = f1().readFileSync(configFilePath, { encoding: "utf8" });

    // Parse the config file contents
    const parsedConfig = f8(configFileContents);

    // Ensure the parsed config is an object
    if (!parsedConfig || typeof parsedConfig !== "object") {
      return {};
    }

    // Extract the mcpServers section
    const mcpServers = parsedConfig.mcpServers;
    if (!mcpServers || typeof mcpServers !== "object") {
      return {};
    }

    // Prepare an object to hold only valid server configs
    const validServers = {};

    // Iterate over each server entry
    for (const [serverName, serverConfig] of Object.entries(mcpServers)) {
      // Ensure the server config is an object
      if (!serverConfig || typeof serverConfig !== "object") {
        continue;
      }
      // Validate the server config using Ny1.safeParse
      const validationResult = Ny1.safeParse(serverConfig);
      if (validationResult.success) {
        validServers[serverName] = validationResult.data;
      }
    }

    return validServers;
  } catch (error) {
    // Log the error using reportErrorIfAllowed, then return an empty object
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return {};
  }
}

module.exports = getValidMcpServersConfig;