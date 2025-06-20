/**
 * Executes a process with optional abort signal and timeout, returning its trimmed output as a string.
 *
 * @param {any} processCommand - The command or process to execute.
 * @param {object|AbortSignal} [options] - Optional configuration object or AbortSignal for aborting the process.
 * @param {number} [timeout=10 * un * dn] - Optional timeout in milliseconds. Defaults to 10 * un * dn.
 * @returns {string|null} The trimmed output of the process as a string, or null if the process fails or produces no output.
 */
function runProcessWithAbortAndTimeout(processCommand, options, timeout = 10 * un * dn) {
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

  // Destructure abortSignal and timeout from processOptions, with a default timeout
  const {
    abortSignal = undefined,
    timeout: processTimeout = 10 * un * dn
  } = processOptions;

  // If an abort signal is provided, throw if already aborted
  abortSignal?.throwIfAborted();

  // Execute the process using WS4 with the specified options
  const processResult = WS4(processCommand, {
    env: process.env,
    maxBuffer: 1e6, // Set maximum buffer size to 1MB
    timeout: processTimeout,
    cwd: iA(), // Get current working directory
    stdio: ["ignore", "pipe", "pipe"] // Ignore stdin, pipe stdout and stderr
  });

  // If the process did not return a result, return null
  if (!processResult) return null;

  // Convert the result to string, trim whitespace, and return null if empty
  return processResult.toString().trim() || null;
}

module.exports = runProcessWithAbortAndTimeout;