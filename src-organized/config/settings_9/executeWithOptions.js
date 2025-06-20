/**
 * Executes a command or process with the specified configuration and options.
 *
 * @param {any} command - The command or observable to execute.
 * @param {any} commandConfig - The configuration object for the command execution.
 * @param {Object} [options] - Additional options for execution.
 * @param {AbortSignal} [options.abortSignal] - Optional abort signal to cancel the execution.
 * @param {number} [options.timeout] - Timeout in milliseconds before aborting the execution.
 * @param {boolean} [options.preserveOutputOnError] - Whether to preserve output if an error occurs.
 * @param {boolean} [options.useCwd] - Whether to use the current working directory.
 * @param {Object} [options.env] - Environment variables to use for execution.
 * @returns {any} The result of the JV function, which executes the command with the provided options.
 */
function executeWithOptions(
  command,
  commandConfig,
  options = {
    timeout: 10 * un * dn, // Default timeout calculation
    preserveOutputOnError: true,
    useCwd: true
  }
) {
  return JV(command, commandConfig, {
    abortSignal: options.abortSignal,
    timeout: options.timeout,
    preserveOutputOnError: options.preserveOutputOnError,
    // Use current working directory if useCwd is true, otherwise undefined
    cwd: options.useCwd ? iA() : undefined,
    env: options.env
  });
}

module.exports = executeWithOptions;