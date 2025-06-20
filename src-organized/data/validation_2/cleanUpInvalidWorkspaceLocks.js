/**
 * Attempts to clean up invalid or stale workspace lock files.
 * For each lock file found, isBlobOrFileLikeObject checks if the associated process/connection is still valid.
 * If not, isBlobOrFileLikeObject removes the lock file. Handles errors gracefully and logs them.
 *
 * Dependencies:
 * - getSortedLockFilePaths(): Returns an array of lock file paths.
 * - parseWorkspaceLockFile(lockFilePath): Parses the lock file and returns connection details or null if invalid.
 * - f1(): Returns the fs module (with unlinkSync).
 * - reportErrorIfAllowed(error): Error logging/handling function.
 * - tr0(runningInWindows, port): Resolves the host to connect to, based on OS and port.
 * - dr0(pid): Checks if a process with the given PID is running.
 * - rQ(): Returns the current platform (e.g., 'wsl').
 * - checkTcpConnection(host, port): Checks TCP connectivity to the given host and port.
 *
 * @async
 * @function cleanUpInvalidWorkspaceLocks
 * @returns {Promise<void>} Resolves when cleanup is complete.
 */
async function cleanUpInvalidWorkspaceLocks() {
  try {
    // Get all workspace lock file paths
    const lockFilePaths = getSortedLockFilePaths();

    for (const lockFilePath of lockFilePaths) {
      // Parse the lock file to get connection details
      const connectionDetails = parseWorkspaceLockFile(lockFilePath);

      if (!connectionDetails) {
        // If parsing failed, remove the invalid lock file
        try {
          f1().unlinkSync(lockFilePath);
        } catch (unlinkError) {
          reportErrorIfAllowed(unlinkError);
        }
        continue;
      }

      // Determine the host to connect to based on OS and port
      const host = await tr0(connectionDetails.runningInWindows, connectionDetails.port);
      let shouldRemoveLock = false;

      if (connectionDetails.pid) {
        // If a PID is present, check if the process is still running
        if (!dr0(connectionDetails.pid)) {
          // If not running and not on WSL, mark for removal
          if (rQ() !== "wsl") {
            shouldRemoveLock = true;
          } else if (!(await checkTcpConnection(host, connectionDetails.port))) {
            // On WSL, also check TCP connectivity
            shouldRemoveLock = true;
          }
        }
      } else if (!(await checkTcpConnection(host, connectionDetails.port))) {
        // If no PID, check TCP connectivity
        shouldRemoveLock = true;
      }

      if (shouldRemoveLock) {
        try {
          f1().unlinkSync(lockFilePath);
        } catch (unlinkError) {
          reportErrorIfAllowed(unlinkError);
        }
      }
    }
  } catch (error) {
    reportErrorIfAllowed(error);
  }
}

module.exports = cleanUpInvalidWorkspaceLocks;