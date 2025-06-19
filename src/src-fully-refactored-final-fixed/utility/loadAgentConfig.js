/**
 * Loads the agent configuration JSON file for a given agent identifier.
 *
 * Constructs the configuration file name using the current environment identifier
 * and the provided agentId, then loads the configuration using external utilities.
 *
 * @param {string} agentId - The unique identifier for the agent whose configuration is to be loaded.
 * @returns {string} The loaded agent configuration as a string (or the result of PW1).
 */
function loadAgentConfig(agentId) {
  // Generate the environment or version prefix using g9()
  const environmentId = g9();

  // Construct the configuration file name in the format: <envId>-agent-<agentId>.json
  const configFileName = `${environmentId}-agent-${agentId}.json`;

  // Get the base path or context using ensureTodosDirectoryExists()
  const basePath = ensureTodosDirectoryExists();

  // Load and return the agent configuration using PW1()
  return PW1(basePath, configFileName);
}

module.exports = loadAgentConfig;