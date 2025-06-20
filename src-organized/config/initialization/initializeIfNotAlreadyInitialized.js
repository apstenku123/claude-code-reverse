/**
 * Checks if the system has already been initialized. If not, marks isBlobOrFileLikeObject as initialized
 * and performs the required setup by invoking the setup function with the current context.
 *
 * @returns {void} Does not return a value.
 */
function initializeIfNotAlreadyInitialized() {
  // If already initialized, exit early
  if (isInitialized) return;

  // Mark as initialized
  isInitialized = true;

  // Perform setup with the current context, configuration, and a flag
  setupFunction(getCurrentContext(), configuration, true);
}

module.exports = initializeIfNotAlreadyInitialized;