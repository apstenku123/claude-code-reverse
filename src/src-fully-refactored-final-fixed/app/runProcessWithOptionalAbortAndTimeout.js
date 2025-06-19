/**
 * Executes a process with optional abort signal and timeout configuration.
 *
 * @param {any} processCommand - The command or configuration to run the process with.
 * @param {object|AbortSignal} [options] - Optional configuration object or AbortSignal for process control.
 * @param {number} [timeout=10 * un * dn] - Optional timeout in milliseconds. Defaults to 10 * un * dn.
 * @returns {string|null} The trimmed string output of the process, or null if the process fails or produces no output.
 */
function runProcessWithOptionalAbortAndTimeout(processCommand, options, timeout = 10 * un * dn) {
  let processOptions;

  // Determine the process options based on the type of 'options' argument
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
    abortSignal,
    timeout: effectiveTimeout = 10 * un * dn
  } = processOptions;

  // If an abort signal is provided, throw if already aborted
  abortSignal?.throwIfAborted();

  // Start the process with the specified options
  const processResult = WS4(processCommand, {
    env: process.env,
    maxBuffer: 1e6,
    timeout: effectiveTimeout,
    cwd: iA(),
    stdio: ["ignore", "pipe", "pipe"]
  });

  // If the process did not start or failed, return null
  if (!processResult) return null;

  // Return the trimmed string output, or null if empty
  return processResult.toString().trim() || null;
}

module.exports = runProcessWithOptionalAbortAndTimeout;