/**
 * Registers a new server configuration after validating the server name and configuration JSON.
 * Throws descriptive errors if validation fails or if the server name already exists.
 *
 * @param {string} serverName - The unique name for the server. Must contain only letters, numbers, hyphens, or underscores.
 * @param {string} configJson - The server configuration as a JSON string.
 * @param {string} [scope="local"] - The scope in which to register the server (default is "local").
 * @throws {Error} If the server name is invalid, already exists, or the configuration is invalid.
 */
function registerServerConfiguration(serverName, configJson, scope = "local") {
  // Validate server name: only allow letters, numbers, hyphens, and underscores
  if (serverName.match(/[^A-Za-z0-9_-]/)) {
    throw new Error(`Invalid name ${serverName}. Names can only contain letters, numbers, hyphens, and underscores.`);
  }

  // Check if a server with this name already exists
  if (getMcpServerConfigByScope(serverName)) {
    throw new Error(`a server with the name ${serverName} already exists.`);
  }

  // Parse the configuration JSON string
  const parsedConfig = f8(configJson);
  if (!parsedConfig) {
    throw new Error("Invalid JSON");
  }

  // Validate the parsed configuration using the schema parser
  const validationResult = $processAndValidateInput.safeParse(parsedConfig);
  if (!validationResult.success) {
    // Collect all validation errors into a single message
    const errorMessages = validationResult.error.errors
      .map(errorDetail => `${errorDetail.path.join(".")}: ${errorDetail.message}`)
      .join(", ");
    throw new Error(`Invalid configuration: ${errorMessages}`);
  }

  // Register the server configuration with the validated data
  updateMcpServerConfig(serverName, validationResult.data, scope);
}

module.exports = registerServerConfiguration;
