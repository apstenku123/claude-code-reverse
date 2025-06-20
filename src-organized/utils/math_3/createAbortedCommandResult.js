/**
 * Creates a mock command execution result representing an aborted command.
 *
 * @param {string|number} backgroundTaskId - The unique identifier for the background task that was aborted.
 * @returns {object} An object simulating a command execution with methods for background, kill, and a resolved result Promise.
 */
function createAbortedCommandResult(backgroundTaskId) {
  return {
    // No background process is started, so this returns null
    background: () => null,

    // No process to kill, so this is a no-op
    kill: () => {},

    // Immediately resolved Promise with details about the aborted command
    result: Promise.resolve({
      code: 145, // Exit code indicating command was aborted
      stdout: "", // No output since command did not run
      stderr: "Command aborted before execution", // Error message
      interrupted: true, // Indicates the command was interrupted
      backgroundTaskId // The updateSnapshotAndNotify of the background task
    })
  };
}

module.exports = createAbortedCommandResult;