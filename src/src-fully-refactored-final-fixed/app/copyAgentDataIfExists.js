/**
 * Copies agent data from a source file to a target file if the source file contains data.
 *
 * @param {string} sourceAgentId - The identifier for the source agent.
 * @param {string} targetAgentId - The identifier for the target agent.
 * @returns {boolean} Returns true if data was copied successfully, false otherwise.
 */
function copyAgentDataIfExists(sourceAgentId, targetAgentId) {
  // Construct the file path for the source agent'createInteractionAccessor JSON file
  const sourceAgentFilePath = PW1(ensureTodosDirectoryExists(), `${sourceAgentId}-agent-${sourceAgentId}.json`);
  // Construct the file path for the target agent'createInteractionAccessor JSON file
  const targetAgentFilePath = PW1(ensureTodosDirectoryExists(), `${targetAgentId}-agent-${targetAgentId}.json`);

  try {
    // Read data from the source agent'createInteractionAccessor file
    const sourceAgentData = Fn0(sourceAgentFilePath);
    // If the source file is empty, return false
    if (sourceAgentData.length === 0) {
      return false;
    }
    // Write the data to the target agent'createInteractionAccessor file
    Jn0(sourceAgentData, targetAgentFilePath);
    return true;
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = copyAgentDataIfExists;