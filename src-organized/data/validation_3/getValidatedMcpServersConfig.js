/**
 * Retrieves and validates the MCP servers configuration from the user'createInteractionAccessor platform.
 * Only supports macOS and WSL platforms. Reads a config file, parses its contents,
 * validates each MCP server entry, and returns a map of valid servers.
 *
 * @returns {Object} An object mapping server names to validated server configurations.
 * @throws {Error} If the platform is unsupported.
 */
function getValidatedMcpServersConfig() {
  // Ensure the current platform is supported (macOS or WSL)
  if (!QT1.includes(rQ())) {
    throw new Error("Unsupported platform - Claude Desktop integration only works on macOS and WSL.");
  }

  try {
    // Get the path to the MCP servers config file
    const configFilePath = getClaudeDesktopConfigPath();

    // Check if the config file exists
    if (!f1().existsSync(configFilePath)) {
      return {};
    }

    // Read the config file contents as UTF-8
    const configFileContents = f1().readFileSync(configFilePath, { encoding: "utf8" });

    // Parse the config file contents
    const parsedConfig = f8(configFileContents);

    // Ensure the parsed config is an object
    if (!parsedConfig || typeof parsedConfig !== "object") {
      return {};
    }

    // Extract the mcpServers object
    const mcpServers = parsedConfig.mcpServers;
    if (!mcpServers || typeof mcpServers !== "object") {
      return {};
    }

    // Prepare the result object for validated servers
    const validatedServers = {};

    // Iterate over each server entry and validate
    for (const [serverName, serverConfig] of Object.entries(mcpServers)) {
      // Ensure the server config is an object
      if (!serverConfig || typeof serverConfig !== "object") {
        continue;
      }
      // Validate the server config using Ny1.safeParse
      const validationResult = Ny1.safeParse(serverConfig);
      if (validationResult.success) {
        validatedServers[serverName] = validationResult.data;
      }
    }

    return validatedServers;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and return an empty object
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return {};
  }
}

module.exports = getValidatedMcpServersConfig;