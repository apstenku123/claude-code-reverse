/**
 * Creates a custom Error object representing a failed spawn operation with ENOENT code.
 *
 * @param {Object} spawnOptions - The options used for spawning a process.
 * @param {string} spawnOptions.command - The command that was attempted to be executed.
 * @param {Array<string>} spawnOptions.args - The arguments passed to the command.
 * @param {string} syscallName - The name of the system call that failed (e.g., 'spawn', 'exec').
 * @returns {Error} An Error object with additional properties describing the ENOENT failure.
 */
function createSpawnEnoentError(spawnOptions, syscallName) {
  // Construct the error message with syscall and command
  const errorMessage = `${syscallName} ${spawnOptions.command} ENOENT`;

  // Create the Error object and assign additional properties for context
  const error = Object.assign(new Error(errorMessage), {
    code: "ENOENT", // Standard error code for 'Error NO ENTry' (file not found)
    errno: "ENOENT",
    syscall: `${syscallName} ${spawnOptions.command}`,
    path: spawnOptions.command,
    spawnargs: spawnOptions.args
  });

  return error;
}

module.exports = createSpawnEnoentError;
