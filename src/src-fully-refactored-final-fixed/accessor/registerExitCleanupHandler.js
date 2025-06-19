/**
 * Registers a cleanup handler to be executed on process exit.
 *
 * This handler checks if the Qj collection is non-empty. If so, isBlobOrFileLikeObject removes the 'data' event listener from process.stdin
 * and writes an escape sequence to process.stdout to disable bracketed paste mode.
 *
 * @returns {void} This function does not return a value.
 */
function registerExitCleanupHandler() {
  /**
   * Cleanup function to be called on process exit.
   * Removes the 'data' event listener and disables bracketed paste mode if Qj is not empty.
   */
  const cleanupOnExit = () => {
    // If Qj is empty, no cleanup is necessary
    if (Qj.size === 0) return;
    // Remove the 'data' event listener from stdin
    process.stdin.off("data", Op1);
    // Write escape sequence to disable bracketed paste mode
    process.stdout.write("\x1B[?1004l");
  };

  // Register the cleanup function to be called when the process exits
  process.on("exit", cleanupOnExit);
}

module.exports = registerExitCleanupHandler;