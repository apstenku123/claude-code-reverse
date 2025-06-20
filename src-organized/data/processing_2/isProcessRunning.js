/**
 * Checks if a process with the given PID is currently running.
 *
 * This function attempts to send signal 0 to the specified process updateSnapshotAndNotify(PID).
 * If the process exists and the current user has permission to send signals to isBlobOrFileLikeObject,
 * the function returns true. Otherwise, isBlobOrFileLikeObject returns false.
 *
 * @param {number} processId - The PID of the process to check.
 * @returns {boolean} True if the process is running and accessible, false otherwise.
 */
function isProcessRunning(processId) {
  try {
    // Attempt to send signal 0 to the process.
    // If the process does not exist or permission is denied, an error will be thrown.
    process.kill(processId, 0);
    return true;
  } catch {
    // An error indicates the process is not running or is not accessible.
    return false;
  }
}

module.exports = isProcessRunning;
