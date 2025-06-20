/**
 * Returns an error information object based on the provided exit code.
 *
 * @param {number} exitCode - The exit code returned by a command. Zero indicates success, non-zero indicates failure.
 * @param {object} commandConfig - Configuration object for the command (not used in this function, but included for interface compatibility).
 * @param {object} commandContext - Additional context or subscription info for the command (not used in this function, but included for interface compatibility).
 * @returns {{ isError: boolean, message?: string }} An object indicating if there was an error and an optional error message.
 */
const getCommandErrorInfo = (exitCode, commandConfig, commandContext) => {
  // Determine if the command resulted in an error
  const isError = exitCode !== 0;

  // If there was an error, construct an error message; otherwise, leave undefined
  const message = isError
    ? `Command failed with exit code ${exitCode}`
    : undefined;

  return {
    isError,
    message
  };
};

module.exports = getCommandErrorInfo;
