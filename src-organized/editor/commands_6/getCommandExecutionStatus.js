/**
 * Determines if a command execution resulted in an error based on its exit code.
 *
 * @param {number} exitCode - The exit code returned by the executed command. Zero indicates success; any other value indicates an error.
 * @param {object} commandConfig - Configuration object for the command execution (unused in this function, but may be relevant for future extension).
 * @param {object} commandResult - The result or output object from the command execution (unused in this function, but may be relevant for future extension).
 * @returns {{ isError: boolean, message?: string }} An object indicating if there was an error and an optional error message.
 */
const getCommandExecutionStatus = (exitCode, commandConfig, commandResult) => {
  // Check if the exit code is non-zero, which indicates an error
  const isError = exitCode !== 0;

  // If there is an error, provide a descriptive message; otherwise, leave undefined
  const message = isError ? `Command failed with exit code ${exitCode}` : undefined;

  return {
    isError,
    message
  };
};

module.exports = getCommandExecutionStatus;
