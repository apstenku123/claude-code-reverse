/**
 * Attempts to perform a graceful shutdown of the application.
 * If the shutdown process fails, logs the error and exits the process with the provided exit code.
 *
 * @param {number} exitCode - The exit code to use when terminating the process. Defaults to 0.
 * @returns {void}
 */
function performGracefulShutdown(exitCode = 0) {
  // Attempt to perform a graceful shutdown
  performCleanupAndExit(exitCode).catch(error => {
    // Log the error if graceful shutdown fails
    HG(`Graceful shutdown failed: ${error}`);
    // Exit the process with the provided exit code
    process.exit(exitCode);
  });
}

module.exports = performGracefulShutdown;