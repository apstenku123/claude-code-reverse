/**
 * Attempts to send a signal to a process with the given PID. Ignores the error if the process does not exist.
 *
 * @param {string|number} processId - The process updateSnapshotAndNotify(PID) to signal. Will be parsed as an integer.
 * @param {string|number} signal - The signal to send (e.g., 'SIGTERM', 'SIGKILL', or a signal number).
 * @returns {void}
 * @throws {Error} Throws any error except when the process does not exist (ESRCH).
 */
function killProcessIfExists(processId, signal) {
  try {
    // Attempt to send the specified signal to the process with the given PID
    process.kill(parseInt(processId, 10), signal);
  } catch (error) {
    // Ignore error if the process does not exist
    if (error.code !== "ESRCH") {
      throw error;
    }
  }
}

module.exports = killProcessIfExists;
