/**
 * Executes a process or task with the given configuration and options.
 *
 * @param {any} processConfig - The configuration or command to execute.
 * @param {any} processArgs - Arguments or additional configuration for the process.
 * @param {Object} [options] - Optional settings for process execution.
 * @param {AbortSignal} [options.abortSignal] - Signal to abort the process.
 * @param {number} [options.timeout] - Timeout in milliseconds for the process.
 * @param {boolean} [options.preserveOutputOnError] - Whether to keep output if an error occurs.
 * @param {boolean} [options.useCwd] - Whether to use the current working directory.
 * @param {Object} [options.env] - Environment variables for the process.
 * @returns {any} The result of the process execution.
 */
function runWithOptions(
  processConfig,
  processArgs,
  options = {
    timeout: 10 * un * dn, // Default timeout calculation
    preserveOutputOnError: true,
    useCwd: true
  }
) {
  return JV(processConfig, processArgs, {
    abortSignal: options.abortSignal,
    timeout: options.timeout,
    preserveOutputOnError: options.preserveOutputOnError,
    // Use current working directory if useCwd is true, otherwise undefined
    cwd: options.useCwd ? iA() : undefined,
    env: options.env
  });
}

module.exports = runWithOptions;