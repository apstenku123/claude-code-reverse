/**
 * Resets the iTerm2 setup progress flag in the configuration object and updates the projects accessor.
 *
 * This function retrieves the current configuration (from cache or fresh), sets the
 * 'iterm2SetupInProgress' property to false, and then updates the projects accessor
 * with the modified configuration. This ensures that any ongoing iTerm2 setup process
 * is marked as not in progress and the change is persisted.
 *
 * @returns {void} This function does not return a value.
 */
function resetIterm2SetupInConfig() {
  // Retrieve the current configuration object (from cache or disk)
  const config = getCachedOrFreshConfig();

  // Mark iTerm2 setup as not in progress
  config.iterm2SetupInProgress = false;

  // Update the projects accessor with the modified configuration
  updateProjectsAccessor(config);
}

module.exports = resetIterm2SetupInConfig;