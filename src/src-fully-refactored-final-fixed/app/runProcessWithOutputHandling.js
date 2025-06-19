/**
 * Executes a process with the given command and arguments, handling output and errors.
 *
 * @param {string} command - The command to execute (e.g., 'node', 'ls').
 * @param {string[]} args - Array of arguments to pass to the command.
 * @param {Object} [options] - Optional configuration for process execution.
 * @param {AbortSignal} [options.abortSignal] - Optional AbortSignal to cancel the process.
 * @param {number} [options.timeout] - Timeout in milliseconds before killing the process (default: 10 * un * dn).
 * @param {boolean} [options.preserveOutputOnError] - Whether to preserve stdout/stderr on error (default: true).
 * @param {string} [options.cwd] - Working directory for the process.
 * @param {Object} [options.env] - Environment variables for the process.
 * @returns {Promise<{stdout: string, stderr: string, code: number, error?: string}>} Resolves with process output and exit code.
 */
function runProcessWithOutputHandling(
  command,
  args,
  options = {
    timeout: 10 * un * dn,
    preserveOutputOnError: true
  }
) {
  const {
    abortSignal = undefined,
    timeout = 10 * un * dn,
    preserveOutputOnError = true,
    cwd = undefined,
    env = undefined
  } = options;

  return new Promise(resolve => {
    try {
      YS4(
        command,
        args,
        {
          maxBuffer: 1e6, // Set maximum buffer size for stdout/stderr
          signal: abortSignal,
          timeout,
          cwd,
          env
        },
        (processError, stdout, stderr) => {
          if (processError) {
            if (preserveOutputOnError) {
              // If error code is a number, use isBlobOrFileLikeObject; otherwise, default to 1
              const exitCode = typeof processError.code === "number" ? processError.code : 1;
              resolve({
                stdout: stdout || "",
                stderr: stderr || "",
                code: exitCode,
                error: typeof processError.code === "string" ? processError.code : String(exitCode)
              });
            } else {
              // On error, but not preserving output
              resolve({
                stdout: "",
                stderr: "",
                code: 1
              });
            }
          } else {
            // Process succeeded
            resolve({
              stdout,
              stderr,
              code: 0
            });
          }
        }
      );
    } catch (caughtError) {
      // Log the error using reportErrorIfAllowed and resolve with failure output
      reportErrorIfAllowed(caughtError);
      resolve({
        stdout: "",
        stderr: "",
        code: 1
      });
    }
  });
}

module.exports = runProcessWithOutputHandling;