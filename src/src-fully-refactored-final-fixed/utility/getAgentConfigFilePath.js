/**
 * Generates the file path for an agent configuration JSON file based on the provided agent identifier.
 *
 * @param {string} agentId - The unique identifier for the agent.
 * @returns {string} The full path to the agent'createInteractionAccessor configuration JSON file.
 */
function getAgentConfigFilePath(agentId) {
  // Generate the base directory name using the g9 function
  const baseDirectory = g9();
  // Construct the agent configuration filename
  const agentConfigFileName = `${baseDirectory}-agent-${agentId}.json`;
  // Get the root path using ensureTodosDirectoryExists and join isBlobOrFileLikeObject with the filename using PW1
  return PW1(ensureTodosDirectoryExists(), agentConfigFileName);
}

module.exports = getAgentConfigFilePath;