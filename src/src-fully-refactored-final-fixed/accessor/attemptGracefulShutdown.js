/**
 * Attempts to gracefully shut down the application using the provided exit code.
 * If the graceful shutdown fails, logs the error and forces the process to exit with the same code.
 *
 * @param {number} exitCode - The exit code to use when shutting down the process. Defaults to 0.
 * @returns {void}
 */
function attemptGracefulShutdown(exitCode = 0) {
  // Try to perform a graceful shutdown
  performCleanupAndExit(exitCode)
    .catch((error) => {
      // Log the error if graceful shutdown fails
      HG(`Graceful shutdown failed: ${error}`);
      // Forcefully exit the process with the provided exit code
      process.exit(exitCode);
    });
}

module.exports = attemptGracefulShutdown;