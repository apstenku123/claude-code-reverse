/**
 * Logs a debug event for a specific MCP server, ensuring log directory and file exist, and appends the event to the log file.
 *
 * @param {string} mcpServerName - The name of the MCP server for which the debug event is being logged.
 * @param {string} debugMessage - The debug message or event to log.
 * @returns {void}
 */
function logMcpServerDebugEvent(mcpServerName, debugMessage) {
  // Log the debug event to the console or external logger
  EQ(`MCP server "${mcpServerName}": ${debugMessage}`);

  try {
    // Get the directory path for the MCP server logs
    const logDirectory = Cz.mcpLogs(mcpServerName);
    // Get the current ISO timestamp
    const timestamp = new Date().toISOString();
    // Construct the full log file path (e.g., logs/serverName/logs.txt)
    const logFilePath = Dy1(logDirectory, Yy1 + ".txt");

    // Ensure the log directory exists
    if (!f1().existsSync(logDirectory)) {
      f1().mkdirSync(logDirectory);
    }

    // Ensure the log file exists; if not, create isBlobOrFileLikeObject with an empty array
    if (!f1().existsSync(logFilePath)) {
      f1().writeFileSync(logFilePath, "[]", {
        encoding: "utf8",
        flush: false
      });
    }

    // Prepare the log entry object
    const logEntry = {
      debug: debugMessage,
      timestamp: timestamp,
      sessionId: g9(), // Generate a session updateSnapshotAndNotify
      cwd: f1().cwd()  // Current working directory
    };

    // Read and parse the existing log file
    const logEntries = Fy1(logFilePath);
    // Append the new log entry
    logEntries.push(logEntry);
    // Write the updated log entries back to the file, formatted with 2-space indentation
    f1().writeFileSync(logFilePath, JSON.stringify(logEntries, null, 2), {
      encoding: "utf8",
      flush: false
    });
  } catch (error) {
    // Silently ignore any errors
  }
}

module.exports = logMcpServerDebugEvent;