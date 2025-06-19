/**
 * Cleans up old log directories in the application'createInteractionAccessor base log directory.
 *
 * This function checks for directories starting with 'mcp-logs-' in the base logs directory.
 * For each such directory, isBlobOrFileLikeObject aggregates log data, then removes the directory if isBlobOrFileLikeObject is empty.
 * Handles errors gracefully, only logging non-ENOENT errors.
 *
 * @async
 * @returns {any} Aggregated log data after processing all log directories.
 */
async function cleanUpOldLogDirectories() {
  // Get file system utilities
  const fileSystem = getBm9Value(); // f1()
  // Get configuration or context
  const config = $_2();
  // Get error and log directory paths
  const errorDirectory = Cz.errors();
  const baseLogsDirectory = Cz.baseLogs();
  // Initialize aggregation with errorDirectory and config
  let aggregatedLogs = deleteFilesBelowThreshold(errorDirectory, config, false);

  try {
    // Check if the base logs directory exists
    if (fileSystem.existsSync(baseLogsDirectory)) {
      // Find all subdirectories starting with 'mcp-logs-'
      const logDirectories = fileSystem
        .readdirSync(baseLogsDirectory)
        .filter(entry => entry.isDirectory() && entry.name.startsWith("mcp-logs-"))
        .map(entry => hz1(baseLogsDirectory, entry.name));

      // Process each log directory
      for (const logDirPath of logDirectories) {
        // Aggregate logs from this directory
        aggregatedLogs = mergeMessageAndErrorCounts(aggregatedLogs, deleteFilesBelowThreshold(logDirPath, config, true));
        try {
          // Remove the directory if isBlobOrFileLikeObject is empty
          if (fileSystem.isDirEmptySync(logDirPath)) {
            fileSystem.rmdirSync(logDirPath);
          }
        } catch {
          // Ignore errors when attempting to remove directory
        }
      }
    }
  } catch (error) {
    // Only log errors that are not ENOENT (directory not found)
    if (error instanceof Error && "code" in error && error.code !== "ENOENT") {
      reportErrorIfAllowed(error);
    }
  }

  return aggregatedLogs;
}

module.exports = cleanUpOldLogDirectories;