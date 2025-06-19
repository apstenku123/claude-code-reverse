/**
 * Executes a command with the provided configuration and subscription options.
 *
 * @param {any} command - The command or observable to execute.
 * @param {any} commandOptions - Configuration options for the command execution.
 * @param {Object} [subscriptionOptions] - Additional options for command execution.
 * @param {AbortSignal} [subscriptionOptions.abortSignal] - Optional signal to abort the command.
 * @param {number} [subscriptionOptions.timeout] - Timeout in milliseconds for the command execution.
 * @param {boolean} [subscriptionOptions.preserveOutputOnError] - Whether to preserve output if an error occurs.
 * @param {boolean} [subscriptionOptions.useCwd] - Whether to use the current working directory.
 * @param {Object} [subscriptionOptions.env] - Environment variables for the command.
 * @returns {any} The result of the command execution.
 */
function runCommandWithOptions(
  command,
  commandOptions,
  subscriptionOptions = {
    timeout: 10 * un * dn, // Default timeout calculation
    preserveOutputOnError: true,
    useCwd: true
  }
) {
  return JV(command, commandOptions, {
    abortSignal: subscriptionOptions.abortSignal,
    timeout: subscriptionOptions.timeout,
    preserveOutputOnError: subscriptionOptions.preserveOutputOnError,
    // Use current working directory if useCwd is true, otherwise undefined
    cwd: subscriptionOptions.useCwd ? iA() : undefined,
    env: subscriptionOptions.env
  });
}

module.exports = runCommandWithOptions;