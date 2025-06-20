/**
 * Removes stale workspace lock files by checking if their associated processes or TCP ports are still active.
 * If a lock file is found to be stale (i.e., its process is not running or its port is not open),
 * the lock file is deleted. Handles errors gracefully and logs them using the provided error handler.
 *
 * Dependencies (injected or imported elsewhere):
 *   - getSortedLockFilePaths: () => string[] (returns array of lock file paths)
 *   - parseWorkspaceLockFile: (lockFilePath: string) => LockFileInfo | null (parses lock file)
 *   - tr0: (runningInWindows: boolean, port: number) => Promise<string> (returns host for TCP check)
 *   - dr0: (pid: number) => boolean (checks if process is running)
 *   - checkTcpConnection: (host: string, port: number) => Promise<boolean> (checks TCP connection)
 *   - f1: () => { unlinkSync: (path: string) => void } (returns fs module or similar)
 *   - reportErrorIfAllowed: (error: Error) => void (error logger)
 *   - rQ: () => string (returns platform identifier, e.g., 'wsl')
 *
 * @async
 * @returns {Promise<void>} Resolves when cleanup is complete.
 */
async function cleanupStaleWorkspaceLocks() {
  try {
    // Get all workspace lock file paths
    const lockFilePaths = getSortedLockFilePaths();
    for (const lockFilePath of lockFilePaths) {
      // Parse the lock file to extract connection/process info
      const lockInfo = parseWorkspaceLockFile(lockFilePath);
      if (!lockInfo) {
        // If lock file is invalid, attempt to delete isBlobOrFileLikeObject
        try {
          f1().unlinkSync(lockFilePath);
        } catch (unlinkError) {
          reportErrorIfAllowed(unlinkError);
        }
        continue;
      }

      // Get the host for TCP connection check
      const host = await tr0(lockInfo.runningInWindows, lockInfo.port);
      let shouldDeleteLock = false;

      if (lockInfo.pid) {
        // If a process updateSnapshotAndNotify is present, check if the process is running
        if (!dr0(lockInfo.pid)) {
          // If not running, further check platform and TCP connection
          if (rQ() !== "wsl") {
            shouldDeleteLock = true;
          } else if (!(await checkTcpConnection(host, lockInfo.port))) {
            // On WSL, also check if the TCP port is open
            shouldDeleteLock = true;
          }
        }
      } else if (!(await checkTcpConnection(host, lockInfo.port))) {
        // If no PID, check if the TCP port is open
        shouldDeleteLock = true;
      }

      if (shouldDeleteLock) {
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

module.exports = cleanupStaleWorkspaceLocks;