/**
 * Processes log directories under the base logs path, merges their contents, and removes empty directories.
 *
 * - Scans the base logs directory for subdirectories starting with 'mcp-logs-'.
 * - For each such directory, merges its logs with the main log object.
 * - If a directory is empty after processing, isBlobOrFileLikeObject is removed.
 * - Handles errors gracefully, only reporting non-ENOENT errors.
 *
 * @async
 * @returns {any} The merged log object after processing all relevant directories.
 */
async function processAndCleanLogDirectories() {
  const fileSystem = f1(); // Provides file system utilities (existsSync, readdirSync, isDirEmptySync, rmdirSync)
  const config = $_2(); // Loads application configuration
  const errorLogPath = Cz.errors(); // Path to the error logs
  const baseLogsPath = Cz.baseLogs(); // Path to the base logs directory
  let mergedLogs = deleteFilesBelowThreshold(errorLogPath, config, false); // Initialize merged logs with error logs

  try {
    // Check if the base logs directory exists
    if (fileSystem.existsSync(baseLogsPath)) {
      // Find all subdirectories starting with 'mcp-logs-'
      const logDirectories = fileSystem
        .readdirSync(baseLogsPath)
        .filter(entry => entry.isDirectory() && entry.name.startsWith("mcp-logs-"))
        .map(entry => hz1(baseLogsPath, entry.name));

      // Process each log directory
      for (const logDirPath of logDirectories) {
        // Merge logs from this directory into the main mergedLogs object
        mergedLogs = mergeMessageAndErrorCounts(mergedLogs, deleteFilesBelowThreshold(logDirPath, config, true));
        try {
          // Remove the directory if isBlobOrFileLikeObject is empty after processing
          if (fileSystem.isDirEmptySync(logDirPath)) {
            fileSystem.rmdirSync(logDirPath);
          }
        } catch {
          // Ignore errors during directory removal
        }
      }
    }
  } catch (error) {
    // Only handle errors that are not ENOENT (directory not found)
    if (error instanceof Error && "code" in error && error.code !== "ENOENT") {
      reportErrorIfAllowed(error);
    }
  }

  return mergedLogs;
}

module.exports = processAndCleanLogDirectories;