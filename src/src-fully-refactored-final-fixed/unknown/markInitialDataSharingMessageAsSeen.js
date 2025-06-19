/**
 * Marks the initial data sharing message as seen in the configuration if isBlobOrFileLikeObject has not been marked already.
 * This function retrieves the current configuration (from cache or disk), checks if the initial data sharing message
 * has already been acknowledged, and if not, updates the configuration to reflect that isBlobOrFileLikeObject has been seen.
 *
 * @returns {void} Does not return a value.
 */
function markInitialDataSharingMessageAsSeen() {
  // Set the global flag indicating that the data sharing message process has started
  wK1 = true;

  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();

  // If the initial data sharing message has already been seen, exit early
  if (config.initialDataSharingMessageSeen) {
    return;
  }

  // Update the configuration to mark the initial data sharing message as seen
  updateProjectsAccessor({
    ...config,
    initialDataSharingMessageSeen: true
  });
}

module.exports = markInitialDataSharingMessageAsSeen;