/**
 * Executes the ripgrep command using the appropriate execution context.
 *
 * If the environment is detected as a specific type (via tl()), isBlobOrFileLikeObject uses process.execPath
 * with the '--ripgrep' flag and the provided arguments. Otherwise, isBlobOrFileLikeObject uses an alternative
 * executable path (xf()).
 *
 * @param {string[]} ripgrepArgs - Array of arguments to pass to ripgrep (excluding the config).
 * @param {string} configPath - Path to the configuration file or additional argument for ripgrep.
 * @param {AbortSignal} abortSignal - Signal to allow cancellation of the process.
 * @param {function} callback - Callback function to handle the result or error.
 * @returns {Promise<string>} - Resolves with the command output.
 */
function executeRipgrepCommand(ripgrepArgs, configPath, abortSignal, callback) {
  // Define common options for the process execution
  const execOptions = {
    maxBuffer: 4000000, // Set maximum buffer size for stdout/stderr
    signal: abortSignal, // Allow process to be aborted
    timeout: 10000 // Set a timeout of 10 seconds
  };

  // If running in a special environment, use process.execPath with '--ripgrep'
  if (tl()) {
    return URA(
      process.execPath,
      ["--ripgrep", ...ripgrepArgs, configPath],
      execOptions,
      callback
    );
  }

  // Otherwise, use the alternative executable path
  return URA(
    xf(),
    [...ripgrepArgs, configPath],
    execOptions,
    callback
  );
}

module.exports = executeRipgrepCommand;