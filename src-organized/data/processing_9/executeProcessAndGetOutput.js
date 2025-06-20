/**
 * Executes a process with the given command or configuration and returns its trimmed output as a string.
 *
 * @param {any} command - The command or observable to execute/process.
 * @param {object|AbortSignal} [options] - Optional configuration object or AbortSignal for process control.
 * @param {number} [timeout=10 * un * dn] - Optional timeout in milliseconds for the process execution.
 * @returns {string|null} The trimmed output of the process as a string, or null if no output is produced.
 */
function executeProcessAndGetOutput(command, options, timeout = 10 * un * dn) {
  let processOptions;

  // Determine the process options based on the type of 'options' parameter
  if (options === undefined) {
    processOptions = {};
  } else if (options instanceof AbortSignal) {
    processOptions = {
      abortSignal: options,
      timeout: timeout
    };
  } else {
    processOptions = options;
  }

  // Destructure abortSignal and timeout from processOptions, with default timeout
  const {
    abortSignal = undefined,
    timeout: processTimeout = 10 * un * dn
  } = processOptions;

  // If an abortSignal is provided, throw if already aborted
  abortSignal?.throwIfAborted();

  // Execute the process using WS4 with the provided options
  const processResult = WS4(command, {
    env: process.env,
    maxBuffer: 1e6, // Set maximum buffer size
    timeout: processTimeout,
    cwd: iA(), // Get current working directory
    stdio: ["ignore", "pipe", "pipe"] // Ignore stdin, pipe stdout and stderr
  });

  // If the process did not return a result, return null
  if (!processResult) return null;

  // Return the trimmed output string, or null if empty
  return processResult.toString().trim() || null;
}

module.exports = executeProcessAndGetOutput;