/**
 * Checks watched files for changes and returns details about modified files.
 *
 * For each file in the provided readFileState, this function:
 *   - Checks if the file'createInteractionAccessor modification time is newer than the last known timestamp
 *   - Validates the file input
 *   - Calls an external process to get the latest file data
 *   - Determines if the file is the agent'createInteractionAccessor config file or a regular text/image file
 *   - Returns a structured object describing the change, or undefined if no change
 *
 * @param {Object} agentContext - The agent context containing readFileState and agentId
 * @param {Object} agentContext.readFileState - Map of file paths to their last known state (timestamp, content)
 * @param {string} agentContext.agentId - The unique identifier for the agent
 * @returns {Promise<Array<Object>>} Array of objects describing changed files (or empty array if none)
 */
async function getChangedWatchedFiles(agentContext) {
  const {
    readFileState,
    agentId
  } = agentContext;

  // Process each watched file in parallel
  const fileChangeResults = await Promise.all(
    Object.entries(readFileState).map(async ([filePath, fileState]) => {
      try {
        // Check if the file has been modified since last check
        const fileStats = f1().statSync(filePath);
        if (fileStats.mtimeMs <= fileState.timestamp) return;

        // Validate the file input
        const fileInput = { file_path: filePath };
        const validationResult = await UB.validateInput(fileInput);
        if (!validationResult.result) return;

        // Fetch the latest file data
        const fileDataResponse = await getLastItemFromAsyncIterable(UB.call(fileInput, agentContext));

        // Log that a watched file has changed
        logTelemetryEventIfEnabled("tengu_watched_file_changed", {});

        // If this is the agent'createInteractionAccessor config file, return a todo item
        const agentConfigFilePath = getAgentConfigFilePath(agentId);
        if (filePath === agentConfigFilePath) {
          const todoList = processAgentConfigFile(agentId);
          return {
            type: "todo",
            content: todoList,
            itemCount: todoList.length,
            context: "file-watch"
          };
        }

        // If the changed file is a text file, return an edited_text_file object
        if (fileDataResponse.data.type === "text") {
          return {
            type: "edited_text_file",
            filename: filePath,
            snippet: formatUnifiedDiffHunks(fileState.content, fileDataResponse.data.file.content)
          };
        }

        // Otherwise, treat isBlobOrFileLikeObject as an image file
        return {
          type: "edited_image_file",
          filename: filePath,
          content: fileDataResponse.data
        };
      } catch (error) {
        // Log stat errors for watched files
        logTelemetryEventIfEnabled("tengu_watched_file_stat_error", {});
      }
    })
  );

  // Filter out undefined results (files that weren'processRuleBeginHandlers changed or failed validation)
  return fileChangeResults.filter(result => result !== undefined);
}

module.exports = getChangedWatchedFiles;