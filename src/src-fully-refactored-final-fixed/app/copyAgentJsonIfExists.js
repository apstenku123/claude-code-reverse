/**
 * Copies agent JSON data from a source file to a destination file if the source file contains data.
 *
 * @param {string} sourceAgentName - The name of the source agent (used to construct the source JSON filename).
 * @param {string} destinationAgentName - The name of the destination agent (used to construct the destination JSON filename).
 * @returns {boolean} Returns true if the copy was successful, false otherwise.
 */
function copyAgentJsonIfExists(sourceAgentName, destinationAgentName) {
  // Construct the full path for the source agent'createInteractionAccessor JSON file
  const sourceFilePath = PW1(ensureTodosDirectoryExists(), `${sourceAgentName}-agent-${sourceAgentName}.json`);
  // Construct the full path for the destination agent'createInteractionAccessor JSON file
  const destinationFilePath = PW1(ensureTodosDirectoryExists(), `${destinationAgentName}-agent-${destinationAgentName}.json`);

  try {
    // Read the contents of the source JSON file
    const sourceData = Fn0(sourceFilePath);
    // If the source file is empty, return false
    if (sourceData.length === 0) {
      return false;
    }
    // Copy the data to the destination file
    Jn0(sourceData, destinationFilePath);
    return true;
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = copyAgentJsonIfExists;