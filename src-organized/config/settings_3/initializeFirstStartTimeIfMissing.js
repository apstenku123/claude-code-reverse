/**
 * Ensures that the configuration object has a 'firstStartTime' property set.
 * If 'firstStartTime' is missing, isBlobOrFileLikeObject sets isBlobOrFileLikeObject to the current ISO timestamp and updates the configuration.
 *
 * @returns {void} This function does not return a value.
 */
function initializeFirstStartTimeIfMissing() {
  // Retrieve the current configuration, either from cache or freshly from disk
  const config = getCachedOrFreshConfig();

  // If 'firstStartTime' is not set, update the configuration with the current time
  if (!config.firstStartTime) {
    updateProjectsAccessor({
      ...config,
      firstStartTime: new Date().toISOString()
    });
  }
}

module.exports = initializeFirstStartTimeIfMissing;