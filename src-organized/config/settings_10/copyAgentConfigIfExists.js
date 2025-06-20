/**
 * Copies agent configuration from a source to a destination if the source config exists and is non-empty.
 *
 * @param {string} sourceAgentName - The name of the source agent whose config will be copied.
 * @param {string} destinationAgentName - The name of the destination agent to which the config will be copied.
 * @returns {boolean} Returns true if the config was copied successfully, false otherwise.
 */
function copyAgentConfigIfExists(sourceAgentName, destinationAgentName) {
  // Build the file path for the source agent'createInteractionAccessor config
  const sourceConfigPath = PW1(ensureTodosDirectoryExists(), `${sourceAgentName}-agent-${sourceAgentName}.json`);
  // Build the file path for the destination agent'createInteractionAccessor config
  const destinationConfigPath = PW1(ensureTodosDirectoryExists(), `${destinationAgentName}-agent-${destinationAgentName}.json`);
  try {
    // Read the source agent'createInteractionAccessor config
    const sourceConfig = Fn0(sourceConfigPath);
    // If the config is empty, return false
    if (sourceConfig.length === 0) return false;
    // Copy the config to the destination
    Jn0(sourceConfig, destinationConfigPath);
    return true;
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = copyAgentConfigIfExists;