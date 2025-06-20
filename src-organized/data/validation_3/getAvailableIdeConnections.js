/**
 * Retrieves and validates available IDE connections, returning their details.
 *
 * This function scans for available IDE/workspace connections by parsing lock files, validates them
 * according to environment and process checks, and returns a list of connection details including
 * URLs, names, workspace folders, ports, validity, and authentication tokens.
 *
 * @param {boolean} includeInvalidConnections - If true, includes invalid connections in the result.
 * @returns {Promise<Array<{url: string, name: string, workspaceFolders: Array<string>, port: number, isValid: boolean, authToken: string}>>}
 *   An array of IDE connection details.
 */
async function getAvailableIdeConnections(includeInvalidConnections) {
  const ideConnections = [];
  try {
    // Get the port from environment variable, if set
    const ssePortEnv = process.env.CLAUDE_CODE_SSE_PORT;
    const ssePort = ssePortEnv ? parseInt(ssePortEnv, 10) : null;
    // Get the current workspace root identifier
    const currentWorkspaceRoot = C4();
    // Get all workspace lock files
    const workspaceLockFiles = getSortedLockFilePaths();

    for (const lockFilePath of workspaceLockFiles) {
      // Parse the lock file to extract connection info
      const connectionInfo = parseWorkspaceLockFile(lockFilePath);
      if (!connectionInfo) continue;

      // Validate process and environment for this connection
      if (
        rQ() !== "wsl" && // Not running in WSL
        qw() && // Is running in supported environment
        (!connectionInfo.pid || !isAncestorProcess(connectionInfo.pid)) // PID missing or process not running
      ) {
        continue;
      }

      let isValidConnection = false;
      // Allow skipping validation via environment variable
      if (process.env.CLAUDE_CODE_IDE_SKIP_VALID_CHECK === "true") {
        isValidConnection = true;
      } else if (ssePort && connectionInfo.port === ssePort) {
        // If port matches the environment variable, consider valid
        isValidConnection = true;
      } else {
        // Otherwise, check if any workspace folder matches the current workspace root
        isValidConnection = connectionInfo.workspaceFolders.some(folder => {
          if (!folder) return false;
          const folderRoot = ro(folder);
          return (
            currentWorkspaceRoot === folderRoot ||
            currentWorkspaceRoot.startsWith(folderRoot + mr0)
          );
        });
      }

      // If not valid and not including invalid connections, skip
      if (!isValidConnection && !includeInvalidConnections) continue;

      // Determine the display name for the IDE
      let ideDisplayName = connectionInfo.ideName ?? (qw() ? getEditorDisplayName(pA.terminal) : "IDE");
      // If a connection with the same name exists, append port to distinguish
      if (ideConnections.some(conn => conn.name === ideDisplayName)) {
        ideDisplayName += ` (${connectionInfo.port})`;
      }

      // Resolve the host address for the connection
      const hostAddress = await tr0(connectionInfo.runningInWindows, connectionInfo.port);
      // Build the connection URL (WebSocket or HTTP SSE)
      let connectionUrl;
      if (connectionInfo.useWebSocket) {
        connectionUrl = `ws://${hostAddress}:${connectionInfo.port}`;
      } else {
        connectionUrl = `http://${hostAddress}:${connectionInfo.port}/sse`;
      }

      // Add the connection details to the result array
      ideConnections.push({
        url: connectionUrl,
        name: ideDisplayName,
        workspaceFolders: connectionInfo.workspaceFolders,
        port: connectionInfo.port,
        isValid: isValidConnection,
        authToken: connectionInfo.authToken
      });
    }
  } catch (error) {
    // Log any errors encountered during processing
    reportErrorIfAllowed(error);
  }
  return ideConnections;
}

module.exports = getAvailableIdeConnections;
