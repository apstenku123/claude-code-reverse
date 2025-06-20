/**
 * Resets the primary API key in the configuration, updates the project accessor,
 * and clears the cache if available. This is typically used when the API key needs
 * to be invalidated and the configuration/state must be refreshed.
 *
 * @returns {void} No return value.
 */
function resetApiKeyAndRefreshConfig() {
  // Perform any necessary pre-reset logic (side effects, cleanup, etc.)
  deleteMacOSGenericPasswordForConfigKey();

  // Retrieve the current configuration object, using cache if possible
  const config = getCachedOrFreshConfig();

  // Invalidate the primary API key
  config.primaryApiKey = undefined;

  // Update the projects accessor with the modified configuration
  updateProjectsAccessor(config);

  // Clear the cache if the cache object and clear method exist
  if (yi.cache.clear?.()) {
    // Cache cleared successfully
  }
}

module.exports = resetApiKeyAndRefreshConfig;