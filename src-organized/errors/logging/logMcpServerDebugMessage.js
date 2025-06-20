/**
 * Logs a debug message for a specific MCP server to a timestamped log file.
 * Ensures the log directory and file exist, then appends a new log entry with metadata.
 *
 * @param {string} serverName - The name of the MCP server.
 * @param {string} debugMessage - The debug message to log.
 * @returns {void}
 */
function logMcpServerDebugMessage(serverName, debugMessage) {
  // Log the debug message to the console or external logger
  EQ(`MCP server "${serverName}": ${debugMessage}`);
  try {
    // Get the directory path for MCP logs for this server
    const logDirectory = Cz.mcpLogs(serverName);
    // Get the current timestamp in ISO format
    const timestamp = new Date().toISOString();
    // Build the full path to the log file (e.g., logs/serverName/logs.txt)
    const logFilePath = Dy1(logDirectory, Yy1 + ".txt");

    // Ensure the log directory exists
    if (!f1().existsSync(logDirectory)) {
      f1().mkdirSync(logDirectory);
    }

    // Ensure the log file exists and is initialized as an empty array if not
    if (!f1().existsSync(logFilePath)) {
      f1().writeFileSync(logFilePath, "[]", {
        encoding: "utf8",
        flush: false
      });
    }

    // Construct the log entry object
    const logEntry = {
      debug: debugMessage,
      timestamp: timestamp,
      sessionId: g9(),
      cwd: f1().cwd()
    };

    // Read the existing log entries from the file
    const logEntries = Fy1(logFilePath);
    // Add the new log entry
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

module.exports = logMcpServerDebugMessage;