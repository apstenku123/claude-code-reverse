/**
 * Logs an MCP server error to a timestamped log file, ensuring directories and files exist.
 * Also prints an error message to the console in ANSI color if appropriate.
 *
 * @param {string} serverName - The name of the MCP server where the error occurred.
 * @param {Error|string} error - The error object or error message to log.
 * @returns {void}
 */
function logMcpServerError(serverName, error) {
  // Print error to console in ANSI color if cleanup period is not disabled
  if (
    HG(
      FA.ansi256(H4().error)(`MCP server "${serverName}" ${error}`)
    ),
    mergeValidSubscriptions().cleanupPeriodDays === 0
  ) {
    return;
  }
  try {
    // Get the log directory for this MCP server
    const logDirectory = Cz.mcpLogs(serverName);
    // Prepare the error message (stack trace if Error, else string)
    const errorMessage = error instanceof Error ? (error.stack || error.message) : String(error);
    // Get the current timestamp in ISO format
    const timestamp = new Date().toISOString();
    // Build the log file path (e.g., logs/serverName.txt)
    const logFilePath = Dy1(logDirectory, Yy1 + ".txt");

    // Ensure the log directory exists
    if (!f1().existsSync(logDirectory)) {
      f1().mkdirSync(logDirectory);
    }
    // Ensure the log file exists and initialize if not
    if (!f1().existsSync(logFilePath)) {
      f1().writeFileSync(logFilePath, "[]", {
        encoding: "utf8",
        flush: false
      });
    }
    // Prepare the error log entry
    const errorEntry = {
      error: errorMessage,
      timestamp: timestamp,
      sessionId: g9(),
      cwd: f1().cwd()
    };
    // Read existing log entries
    const logEntries = Fy1(logFilePath);
    // Add the new error entry
    logEntries.push(errorEntry);
    // Write updated log entries back to the file
    f1().writeFileSync(logFilePath, JSON.stringify(logEntries, null, 2), {
      encoding: "utf8",
      flush: false
    });
  } catch (e) {
    // Silently ignore any errors during logging
  }
}

module.exports = logMcpServerError;