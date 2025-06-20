/**
 * Attempts to terminate a process with the given PID and signal.
 * If the process does not exist (ESRCH), the error is silently ignored.
 * Any other errors are re-thrown.
 *
 * @param {string|number} processId - The process updateSnapshotAndNotify to terminate.
 * @param {string|number} signal - The signal to send to the process (e.g., 'SIGTERM', 'SIGKILL').
 * @returns {void}
 */
function terminateProcessIfExists(processId, signal) {
  try {
    // Attempt to kill the process with the specified signal
    process.kill(parseInt(processId, 10), signal);
  } catch (error) {
    // Ignore error if process does not exist
    if (error.code !== "ESRCH") {
      throw error;
    }
  }
}

module.exports = terminateProcessIfExists;