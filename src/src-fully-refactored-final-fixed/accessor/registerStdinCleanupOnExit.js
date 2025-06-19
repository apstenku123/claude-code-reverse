/**
 * Registers a cleanup handler to be executed when the Node.js process exits.
 * The handler will remove the 'data' event listener from process.stdin and
 * reset the terminal mouse tracking mode, but only if the Qj set is not empty.
 *
 * @returns {void} This function does not return a value.
 */
function registerStdinCleanupOnExit() {
  /**
   * Cleanup handler for process exit.
   * If there are active listeners in Qj, remove the 'data' event listener from stdin
   * and reset the terminal mouse tracking mode.
   */
  const cleanupStdinAndTerminal = () => {
    // Only perform cleanup if there are active listeners in Qj
    if (Qj.size === 0) return;
    // Remove the 'data' event listener from stdin
    process.stdin.off("data", Op1);
    // Reset terminal mouse tracking mode
    process.stdout.write("\x1B[?1004l");
  };

  // Register the cleanup handler to be called on process exit
  process.on("exit", cleanupStdinAndTerminal);
}

module.exports = registerStdinCleanupOnExit;