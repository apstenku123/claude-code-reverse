/**
 * Generates the file path for an agent configuration JSON file.
 *
 * This utility function constructs a file path string for an agent'createInteractionAccessor configuration
 * JSON file based on the current environment and the provided agent identifier.
 *
 * @param {string} agentId - The unique identifier for the agent.
 * @returns {string} The full path to the agent'createInteractionAccessor configuration JSON file.
 */
function generateAgentConfigPath(agentId) {
  // Generate the environment or version prefix (e.g., 'prod', 'dev', etc.)
  const environmentPrefix = g9();
  // Construct the filename for the agent'createInteractionAccessor configuration JSON
  const agentConfigFileName = `${environmentPrefix}-agent-${agentId}.json`;
  // Get the base directory or path where agent configs are stored
  const agentConfigBasePath = ensureTodosDirectoryExists();
  // Combine the base path and filename to get the full path
  return PW1(agentConfigBasePath, agentConfigFileName);
}

module.exports = generateAgentConfigPath;