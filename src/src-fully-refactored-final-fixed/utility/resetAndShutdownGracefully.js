/**
 * Resets the application state and attempts a graceful shutdown.
 *
 * This utility function first clears the current application state by invoking
 * the resetApplicationState function, then initiates a graceful shutdown
 * process by calling performGracefulShutdown with an exit code of 0.
 *
 * @returns {void} This function does not return a value.
 */
function resetAndShutdownGracefully() {
  // Clear or reset the application state
  resetApplicationState("");
  // Attempt to gracefully shut down the application with exit code 0
  performGracefulShutdown(0);
}

// Dependency injection or external imports would be handled elsewhere
// For example:
// const resetApplicationState = require('./resetApplicationState');
// const performGracefulShutdown = require('./performGracefulShutdown');

module.exports = resetAndShutdownGracefully;