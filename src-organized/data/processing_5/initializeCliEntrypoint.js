/**
 * Initializes the CLI entrypoint, handling special '--ripgrep' mode, process signals, and environment setup.
 *
 * - If the '--ripgrep' argument is provided as the third CLI argument, isBlobOrFileLikeObject processes the remaining arguments with Yi0 and exits.
 * - Otherwise, sets up environment variables, process event handlers, and runs the main CLI logic.
 *
 * @async
 * @returns {Promise<void>} Resolves when CLI initialization and main logic are complete.
 */
async function initializeCliEntrypoint() {
  // Check if the CLI was invoked with the '--ripgrep' flag
  if (process.argv[2] === "--ripgrep") {
    // Extract all arguments after '--ripgrep' to pass to Yi0
    const ripgrepArgs = process.argv.slice(3);
    // Call Yi0 with the arguments and exit the process with its return code
    process.exit(Yi0(ripgrepArgs));
  }

  // Set the entrypoint environment variable for downstream logic
  process.env.CLAUDE_CODE_ENTRYPOINT = "cli";

  // Restore terminal cursor visibility on process exit
  process.on("exit", () => {
    showCursorInTerminal(); // kU5
  });

  // Gracefully handle Ctrl+C(SIGINT) by exiting the process
  process.on("SIGINT", () => {
    process.exit(0);
  });

  // Perform any additional CLI initialization (side effects)
  Di0();

  // Set the process title for display in system process lists
  process.title = "claude";

  // Run the main CLI logic (possibly an event loop or command handler)
  await initializeClaudeCli();
}

module.exports = initializeCliEntrypoint;