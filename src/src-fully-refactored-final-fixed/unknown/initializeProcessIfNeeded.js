/**
 * Checks if the process has already been initialized. If not, marks isBlobOrFileLikeObject as initialized and triggers the setup process.
 *
 * @returns {void} No return value.
 */
function initializeProcessIfNeeded() {
  // If the process is already initialized, exit early
  if (isProcessInitialized) return;

  // Mark the process as initialized
  isProcessInitialized = true;

  // Trigger the setup process with the current context and configuration
  triggerSetup(getCurrentContext(), setupConfig, true);
}

module.exports = initializeProcessIfNeeded;