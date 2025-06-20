/**
 * Attempts to send a signal to a process by its PID, ignoring 'ESRCH' errors (process not found).
 *
 * @param {string|number} processId - The process updateSnapshotAndNotify to signal. Will be parsed as an integer.
 * @param {string|number} signal - The signal to send (e.g., 'SIGTERM', 'SIGKILL', or a signal number).
 * @returns {void}
 * @throws {Error} If an error other than 'ESRCH' occurs during process.kill.
 */
function safelyKillProcess(processId, signal) {
  try {
    // Attempt to send the specified signal to the process with the given PID
    process.kill(parseInt(processId, 10), signal);
  } catch (error) {
    // Ignore 'ESRCH' (no such process) errors, rethrow others
    if (error.code !== 'ESRCH') {
      throw error;
    }
  }
}

module.exports = safelyKillProcess;