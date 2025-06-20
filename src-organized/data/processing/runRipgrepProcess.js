/**
 * Executes the ripgrep process with the specified arguments and options.
 * Depending on the environment, isBlobOrFileLikeObject determines the correct executable path and arguments.
 *
 * @param {string[]} ripgrepArgs - Array of arguments to pass to ripgrep.
 * @param {string} filePath - The file or directory path to search.
 * @param {AbortSignal} abortSignal - Signal to abort the process if needed.
 * @param {function} callback - Callback function to handle process completion.
 * @returns {Promise<string>} - Resolves with the process output as a string.
 */
function runRipgrepProcess(ripgrepArgs, filePath, abortSignal, callback) {
  // Determine if the environment requires a custom executable path
  if (tl()) {
    // Use process.execPath and prepend '--ripgrep' to the arguments
    return URA(
      process.execPath,
      ["--ripgrep", ...ripgrepArgs, filePath],
      {
        maxBuffer: 4000000, // Set maximum buffer size for output
        signal: abortSignal, // Pass abort signal for process cancellation
        timeout: 10000 // Set process timeout to 10 seconds
      },
      callback
    );
  }
  // Use the default executable path from xf()
  return URA(
    xf(),
    [...ripgrepArgs, filePath],
    {
      maxBuffer: 4000000,
      signal: abortSignal,
      timeout: 10000
    },
    callback
  );
}

module.exports = runRipgrepProcess;
