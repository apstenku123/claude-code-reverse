/**
 * Attempts to gracefully shut down the process using the provided exit code.
 * If the graceful shutdown fails, logs the error and forcefully exits the process.
 *
 * @param {number} exitCode - The exit code to use when terminating the process. Defaults to 0.
 * @returns {void}
 */
function handleGracefulShutdown(exitCode = 0) {
  // Attempt a graceful shutdown
  performCleanupAndExit(exitCode)
    .catch((error) => {
      // Log the failure and forcefully exit with the provided exit code
      HG(`Graceful shutdown failed: ${error}`);
      process.exit(exitCode);
    });
}

module.exports = handleGracefulShutdown;