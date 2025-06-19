/**
 * Loads the agent configuration JSON file for a given agent identifier.
 *
 * Constructs the configuration file name using the current environment identifier
 * and the provided agentId, then loads the configuration using external utilities.
 *
 * @param {string} agentId - The unique identifier for the agent whose configuration should be loaded.
 * @returns {string} The loaded agent configuration data as returned by PW1.
 */
function loadAgentConfiguration(agentId) {
  // Generate the environment-specific prefix using g9()
  const environmentId = g9();

  // Construct the configuration file name for the agent
  const agentConfigFileName = `${environmentId}-agent-${agentId}.json`;

  // Load the configuration using PW1, passing the base path from ensureTodosDirectoryExists and the file name
  return PW1(ensureTodosDirectoryExists(), agentConfigFileName);
}

module.exports = loadAgentConfiguration;