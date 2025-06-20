/**
 * Registers a process exit handler that disables terminal mouse input mode if active.
 *
 * This function listens for the process 'exit' event. If the global Qj Set is not empty,
 * isBlobOrFileLikeObject removes the 'data' event listener (Op1) from process.stdin and disables mouse input
 * mode in the terminal by writing the appropriate escape sequence to process.stdout.
 *
 * @returns {void} This function does not return a value.
 */
function registerExitHandlerForInputMode() {
  /**
   * Exit handler to clean up terminal mouse input mode if active.
   *
   * If Qj (a Set tracking active input listeners) is not empty, remove the 'data' event listener
   * and disable mouse input mode in the terminal.
   */
  const exitHandler = () => {
    // If there are no active input listeners, do nothing
    if (Qj.size === 0) return;
    // Remove the 'data' event listener for Op1 from stdin
    process.stdin.off("data", Op1);
    // Write escape sequence to disable mouse input mode
    process.stdout.write("\x1B[?1004l");
  };

  // Register the exit handler for the process 'exit' event
  process.on("exit", exitHandler);
}

module.exports = registerExitHandlerForInputMode;