/**
 * Performs asynchronous cleanup tasks before exiting the process.
 *
 * This function sets the process exit code, attempts to run all registered cleanup callbacks (from rx1),
 * and ensures the process exits after either all cleanups complete or a 2-second timeout, whichever comes first.
 *
 * @param {number} exitCode - The exit code to use when terminating the process. Defaults to 0 (success).
 * @returns {Promise<void>} Resolves when the process is about to exit.
 */
async function performCleanupAndExit(exitCode = 0) {
  // Set the intended exit code for the process
  process.exitCode = exitCode;

  try {
    // Start all cleanup callbacks in parallel
    const cleanupPromise = (async () => {
      try {
        // rx1 is assumed to be a Set or iterable of cleanup functions
        await Promise.all(Array.from(rx1).map(cleanupFn => cleanupFn()));
      } catch {
        // Ignore errors during cleanup
      }
    })();

    // Wait for either all cleanups to finish or a 2-second timeout
    await Promise.race([
      cleanupPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Cleanup timeout")), 2000)
      )
    ]);

    // Exit the process with the specified code
    process.exit(exitCode);
  } catch {
    // If an error occurs (including timeout), force exit with the same code
    process.exit(exitCode);
  }
}

module.exports = performCleanupAndExit;