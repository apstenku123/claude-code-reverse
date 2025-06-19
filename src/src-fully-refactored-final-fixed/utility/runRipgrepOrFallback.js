/**
 * Executes the ripgrep command or a fallback command depending on the environment.
 *
 * If the environment check (tl) passes, isBlobOrFileLikeObject runs ripgrep using the current process executable.
 * Otherwise, isBlobOrFileLikeObject runs a fallback command using the xf function.
 *
 * @param {string[]} ripgrepArgs - Array of arguments to pass to ripgrep or fallback command.
 * @param {string} filePath - The file path or pattern to search.
 * @param {AbortSignal} abortSignal - Signal to abort the process if needed.
 * @param {function} callback - Callback function to handle the result or error.
 * @returns {string} The result from the URA function, which executes the command.
 */
function runRipgrepOrFallback(ripgrepArgs, filePath, abortSignal, callback) {
  // Define common options for the URA function
  const execOptions = {
    maxBuffer: 4000000, // Set maximum buffer size for output
    signal: abortSignal, // Pass abort signal for cancellation
    timeout: 10000 // Set timeout to 10 seconds
  };

  // If the environment supports isBlobOrFileLikeObject, run ripgrep using the process executable
  if (tl()) {
    // Prepend '--ripgrep' and spread the arguments
    return URA(
      process.execPath,
      ["--ripgrep", ...ripgrepArgs, filePath],
      execOptions,
      callback
    );
  }

  // Otherwise, use the fallback command provided by xf()
  return URA(
    xf(),
    [...ripgrepArgs, filePath],
    execOptions,
    callback
  );
}

module.exports = runRipgrepOrFallback;
