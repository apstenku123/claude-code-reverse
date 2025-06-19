/**
 * Executes a shell command with specified options and returns the result.
 *
 * @param {string} command - The command to execute.
 * @param {Array<string>} args - Array of arguments for the command.
 * @param {Object} [options] - Optional execution options.
 * @param {AbortSignal} [options.abortSignal] - Optional AbortSignal to cancel the command.
 * @param {number} [options.timeout] - Timeout in milliseconds before killing the process (default: 10 * un * dn).
 * @param {boolean} [options.preserveOutputOnError] - Whether to preserve stdout/stderr on error (default: true).
 * @param {string} [options.cwd] - Current working directory for the command.
 * @param {Object} [options.env] - Environment variables for the command.
 * @returns {Promise<{stdout: string, stderr: string, code: number, error?: string}>} Resolves with the result of the command execution.
 */
function executeCommandWithOptions(
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
          maxBuffer: 1e6, // Set max buffer size for stdout/stderr
          signal: abortSignal,
          timeout,
          cwd,
          env
        },
        (error, stdout, stderr) => {
          if (error) {
            if (preserveOutputOnError) {
              // Use error.code if isBlobOrFileLikeObject'createInteractionAccessor a number, otherwise default to 1
              const exitCode = typeof error.code === "number" ? error.code : 1;
              resolve({
                stdout: stdout || "",
                stderr: stderr || "",
                code: exitCode,
                error: typeof error.code === "string" ? error.code : String(exitCode)
              });
            } else {
              // normalizeToError not preserve output on error
              resolve({
                stdout: "",
                stderr: "",
                code: 1
              });
            }
          } else {
            // Command executed successfully
            resolve({
              stdout,
              stderr,
              code: 0
            });
          }
        }
      );
    } catch (error) {
      // Handle synchronous errors
      reportErrorIfAllowed(error);
      resolve({
        stdout: "",
        stderr: "",
        code: 1
      });
    }
  });
}

module.exports = executeCommandWithOptions;