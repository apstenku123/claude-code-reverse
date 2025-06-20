/**
 * Sets a local server configuration after validating the server name and configuration JSON.
 *
 * @param {string} serverName - The name of the server to configure. Must contain only letters, numbers, hyphens, and underscores.
 * @param {string} configJson - The server configuration as a JSON string.
 * @param {string} [scope="local"] - The scope for the configuration (default is "local").
 * @throws {Error} Throws if the server name is invalid, already exists, or if the configuration is invalid.
 */
function setLocalServerConfiguration(serverName, configJson, scope = "local") {
  // Validate server name: only allow letters, numbers, hyphens, and underscores
  if (serverName.match(/[^A-Za-z0-9_-]/)) {
    throw new Error(`Invalid name ${serverName}. Names can only contain letters, numbers, hyphens, and underscores.`);
  }

  // Check if a server with the same name already exists
  if (getMcpServerConfigByScope(serverName)) {
    throw new Error(`a server with the name ${serverName} already exists.`);
  }

  // Parse the configuration JSON string
  const parsedConfig = f8(configJson);
  if (!parsedConfig) {
    throw new Error("Invalid JSON");
  }

  // Validate the parsed configuration using the schema validator
  const validationResult = $processAndValidateInput.safeParse(parsedConfig);
  if (!validationResult.success) {
    // Collect all validation errors into a single message
    const errorMessages = validationResult.error.errors
      .map(error => `${error.path.join(".")}: ${error.message}`)
      .join(", ");
    throw new Error(`Invalid configuration: ${errorMessages}`);
  }

  // Store the validated configuration
  updateMcpServerConfig(serverName, validationResult.data, scope);
}

module.exports = setLocalServerConfiguration;
